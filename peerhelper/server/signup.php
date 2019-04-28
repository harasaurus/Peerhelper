<?php
	include "helpers/database.php";
	include "helpers/validation.php";

	$email = $username = $password = "";
	$validation_code = "";

	$username = $_POST["uname"];
	$email = $_POST["email"];
	$password = $_POST["pass"];

	$validation_code = $validation_code.validateFname(0);
	$validation_code = $validation_code.validateLname(0);
	$validation_code = $validation_code.validateUname($username);
	$validation_code = $validation_code.validateEmail($email);
	$validation_code = $validation_code.validatePass($password);
	$validation_code = $validation_code.validationRepass(0);

	if($validation_code == "000000"){
		addUser($username, $email, $password);
		echo "0";
	}else{
		echo $validation_code;
	}
?>