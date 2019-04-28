<?php
	include "helpers/database.php";

	$uname = $_POST["uname"];
	$cid = $_POST["cid"];

	$title = $_POST["title"];
	$text = $_POST["text"];

	$id = addPost($uname, $cid, $title, $text);

	return $id;
?>