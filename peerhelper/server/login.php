<?php
	include "helpers/database.php";
	include "helpers/validation.php";

	$username = $password = "";
	$validation_code = "";

	$username = $_POST["uname"];
	$password = $_POST["pass"];

	$validation_code = validateLoginCredential($username, $password);

	echo $validation_code;
?>