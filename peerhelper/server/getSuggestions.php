<?php
	include "helpers/database.php";
	
	$uname = $_POST["uname"];

	$response = getSuggestions($uname);
	
	$json_response = json_encode($response);

	echo $json_response;
?>