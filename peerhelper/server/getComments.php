<?php
	include "helpers/database.php";
	$pid = $_GET["pid"];

	$response = getComments($pid);

	$json_response = json_encode($response);

	echo $json_encode;
?>