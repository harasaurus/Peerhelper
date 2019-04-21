<?php
	$uri = $return_type = "";
	$content = "";

	$uri = $_GET["uri"];
	$return_type = $_GET["return"];

	$content = file_get_contents($uri);

	echo $content;
?>