<?php
	include "helpers/database.php";
	include "helpers/validation.php";

	$uname = $_POST["uname"];
	$cname = $_POST["cname"];

	$validation_code = validateCommunity($cname);

	$response["code"] = $validation_code;

	if($validation_code == 0){
		$response["id"] = createCommunity($cname, $uname);
	}
	
	$jsonResponse = json_encode($response);

	echo $jsonResponse;
?>