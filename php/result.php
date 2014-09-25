<?php

# Our Current Location
$location = ['51.301819','-0.337613'];

$link = mysqli_connect("localhost","root","luchi1","postboxes");
$result = $link->query("SELECT *,(((acos(sin((".$location[0]."*pi()/180)) * sin((`lat`*pi()/180))+cos((".$location[0]."*pi()/180)) * cos((`lat`*pi()/180)) * cos(((".$location[1]."- `lng`)*pi()/180))))*180/pi())*60*1.1515) as distance FROM boxes ORDER BY distance LIMIT 10");

$output = "<table>";
while($row = mysqli_fetch_array($result)) {
  $output .= "<tr>";
    $output .= "<td>".$row['category']."</td>";
    $output .= "<td>".$row['type']."</td>";
    $output .= "<td>".$row['location']."</td>";
    $output .= "<td>".$row['depot']."</td>";
    $output .= "<td>".$row['outcode']."</td>";
    $output .= "<td>Collected At: ".$row['collection']."</td>";
    $output .= "<td>".number_format($row['distance'],3)." miles</td>";
  $output .= "</tr>";
  
}

echo $output;
