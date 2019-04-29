<?php
	include 'helpers/database.php';

	$uname = $_GET["uname"];
	$cid = $_GET["cid"];

	if($cid == "0"){
		$response = getGlobalFeed($uname);
	}else{
		$response = getCommunityFeed($cid, $uname);
	}

	$json_response = json_encode($response);

	echo $json_response;
?>