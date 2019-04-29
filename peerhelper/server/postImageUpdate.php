<?php
	$id = $_GET["pid"];

	$dest = "../data/images/post/post_$id.jpg";

	if(move_uploaded_file($_FILES["post_create_img"]["tmp_name"], $dest)){
		echo "0";
	}else{
		echo "1";
	}
?>