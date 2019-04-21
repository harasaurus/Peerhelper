<?php
	$response["number"] = 1;
	$community["id"] = 0;
	$community["name"] = "default";
	$response["communities"] = array($community);

	$json_response = json_encode($response);

	echo $json_response;
?>