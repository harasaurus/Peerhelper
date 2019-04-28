<?php
	include "helpers/database.php";
	include "helpers/validation.php";

	$uname = $_POST["uname"];
	$cid = $_POST["cid"];

	if(addMember($cid, $uname)){
		echo 0;	
	}else{
		echo 1;
	}

	
?>