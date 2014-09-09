<?php

# Our Current Location
$location = ['51.301819','-0.337613'];

$link = mysqli_connect("localhost","root","","postboxes");
$result = $link->query("SELECT * FROM boxes WHERE lat LIKE '%51%' AND lng LIKE '%-0.33%' LIMIT 10");

$output = "<table>";
while($row = mysqli_fetch_array($result)) {
  $output .= "<tr>";
    $output .= "<td>".$row['category']."</td>";
    $output .= "<td>".$row['type']."</td>";
    $output .= "<td>".$row['location']."</td>";
    $output .= "<td>".$row['depot']."</td>";
    $output .= "<td>".$row['outcode']."</td>";
    $output .= "<td>Collected At: ".$row['collection']."</td>";
  $output .= "</tr>";
  
}

echo $output;
