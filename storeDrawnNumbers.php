<?php
function storeDrawnNumbers() {
    // Assuming you're using POST method to send data
//   echo  $prize = $_POST["prize"];
//    echo  $numbers = $_POST["number"]; // Assuming "number" is an array of numbers


   echo  $prize = "prize";
   echo  $numbers = 1; // Assuming "number" is an array of numbers


    // Assuming you have a database connection
    $conn = mysqli_connect('localhost', 'root', '', 'luckydraw');


    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
   }
   echo "Connected successfully";
   $sql = "INSERT INTO draw (prize, number) VALUES ('".$prize."', ".$numbers.")";
   if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
   } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
   }
   mysqli_close($conn);
   

}


// Call the function
storeDrawnNumbers();
?>
