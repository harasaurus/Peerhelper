<?php
	include 'helpers/database.php';

	$pid = $_GET["pid"];

	if(removePost($pid)){
		echo "0";	
	}else{
		echo "1";
	}
?>