<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
//$dbname = "sportmanagerdb";
$dbname ="storytellingdb";

if(!$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
{

	die("failed to connect!");
}
