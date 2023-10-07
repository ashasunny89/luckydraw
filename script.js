const prizes = [
  { name: "1st Prize", quantity: 1 },
  { name: "2nd Prize", quantity: 1 },
  { name: "3rd Prize", quantity: 2 },
  { name: "4th Prize", quantity: 2 },
  { name: "5th Prize", quantity: 26 },
  { name: "6th Prize", quantity: 26 },
  { name: "7th Prize", quantity: 26 },
  { name: "8th Prize", quantity: 26 },
  { name: "9th Prize", quantity: 52 },
  { name: "10th Prize", quantity: 52 }
];

const prizeContainer = document.getElementById('prizes');
const resultsContainer = document.getElementById('results');

function generatePrizeHTML(prize) {
  return `
    <div class="prize">
      <h2>${prize.name}</h2>
      <button onclick="draw('${prize.name}', ${prize.quantity})" id="${prize.name.replace(/\s+/g, '-').toLowerCase()}-draw">Draw</button>
      <button onclick="resetDraw('${prize.name.replace(/\s+/g, '-').toLowerCase()}')">Reset</button>
      <button onclick="finalize('${prize.name.replace(/\s+/g, '-').toLowerCase()}-draw')">Finalize</button>
    </div>
    <div> <span id="${prize.name.replace(/\s+/g, '-').toLowerCase()}-span"></span> </div>
  `;
}

function populatePrizes() {
  prizeContainer.innerHTML = prizes.map(prize => generatePrizeHTML(prize)).join('');
}

function draw(prizeName, quantity) {
  const drawnNumbers = [];
  let i = 0;
  while (i < quantity) {
    const randomNumber = Math.floor(Math.random() * (99999 - 12345 + 1)) + 12345;
    if (!drawnNumbers.includes(randomNumber)) {
      drawnNumbers.push(randomNumber);
      i++;
    }
  }

  $.ajax({
    method: 'POST',
    url: '/storeDrawnNumbers.php',
    data: { prize: "1st", number: drawnNumbers },
    dataType: 'json',
    success: function(response) {
      alert();
        if (response.error) {
          alert("error"+response.error)
            // Handle error
        } else {
            const drawButton = document.getElementById(`${prizeName.replace(/\s+/g, '-').toLowerCase()}-draw`);
            const Spantext = document.getElementById(`${prizeName.replace(/\s+/g, '-').toLowerCase()}-span`);
            drawButton.disabled = true;
            Spantext.innerText = `Drawn: ${drawnNumbers.join(', ')}`;
        }
    }
});


}

function resetDraw(buttonId) {
  const drawButton = document.getElementById(buttonId+'-draw');
  const Spantext = document.getElementById(buttonId+'-span');
  drawButton.disabled = false;
  Spantext.innerText = '';
}

function finalize(buttonId) {
  const password = prompt('Enter password to finalize:');
  if (password === 'yks@2023') {
    const drawButton = document.getElementById(buttonId);
    drawButton.disabled = true;
  } else {
    alert('Incorrect password. Finalization failed.');
  }
}

function downloadResults() {
  const resultsText = prizes.map(prize => `${prize.name}: Drawn Numbers`).join('\n\n');
  const blob = new Blob([resultsText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'lucky_draw_results.txt';
  a.click();
}

// Populate prizes on load
populatePrizes();
