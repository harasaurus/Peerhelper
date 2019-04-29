<?php
	include 'helpers/database.php';
	
	$uname = $_GET["uname"];
	$pid = $_GET["pid"];

	$response = getPost($pid, $uname);

	$json_response = json_encode($response);

	echo $json_response;
?>