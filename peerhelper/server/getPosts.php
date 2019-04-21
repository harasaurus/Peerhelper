<?php
	$response["number"] = 1;

	$community["id"] = 0;
	$community["name"] = "default";

	$post["community"] = $community;
	$post["by"] = "admin";
	$post["on"] = "2019-01-01";

	$post_data["id"] = 0;
	$post_data["title"] = "TITLE";
	$post_data["content"] = "content";

	$post["post"] = $post_data;

	$response["posts"] = array($post);

	$json_response = json_encode($response);

	echo $json_response;
?>