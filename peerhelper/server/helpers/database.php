<?php
$dbserver = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "peerhelper";

function userExist($username){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];
		
	$dbhandler = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);
		if ($dbhandler) {
			$query = "SELECT user_id FROM users WHERE username='$username'";
			$result = $dbhandler->query($query);
			
			if ($result->num_rows>0) {
				$dbhandler->close();
				return true;
			}
			$dbhandler->close();
		}	
	return false;
}

function emailExist($email){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];
		
	$dbhandler = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);
		if ($dbhandler) {
			$query = "SELECT email FROM users WHERE email='$email'";
			$result = $dbhandler->query($query);
			
			if ($result->num_rows>0) {
				$dbhandler->close();
				return true;
			}
			$dbhandler->close();
		}	
	return false;
}

function communityNameExist($cname){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];
		
	$dbhandler = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);
		if ($dbhandler) {
			$query = "SELECT community_name FROM community WHERE community_name='$cname'";
			$result = $dbhandler->query($query);
			if ($result->num_rows>0) {
				$dbhandler->close();
				return true;
			}
			$dbhandler->close();
		}	
	return false;
}

function addUser($username, $email, $password){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];
	$dbhandler = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);
	if ($dbhandler) {		
		$query = "INSERT INTO users(username, email, password) 
				  VALUES ('$username', '$email', '$password')";
		if ($dbhandler->query($query)) {
			$dbhandler->close();
			return true;
		}
		$dbhandler->close();
	}
	return false;
}

function matchCredentials($username, $password){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];
	
	$dbhandler= new mysqli($dbserver, $dbusername, $dbpassword, $dbname);
	if ($dbhandler) {
		$query = "SELECT password FROM users WHERE username='$username'";
		$result = $dbhandler->query($query);
		if ($result->num_rows!=1) {
			$dbhandler->close();
			return "3";
		}

		$row=$result->fetch_assoc();
			if ($row["password"]==$password) {
				$dbhandler->close();
				return "0";
			}
			$dbhandler->close();
	}
	return "4";
}

function createCommunity($cname, $uname){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];
	$dbhandler = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);
	if ($dbhandler) {		
		$query = "INSERT INTO community(community_name) 
				  VALUES ('$cname')";
		if ($dbhandler->query($query)) {
			$cid = $dbhandler->insert_id;
			$dbhandler->close();
			return addMember($cid, $uname);
		}
		$dbhandler->close();
	}
	return 0;
	
}

function addMember($cid, $uname){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];

	$dbhandler = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);

	$uid = getUid($uname);
	
	if ($dbhandler) {		
		$query = "INSERT INTO members(community_id, user_id) 
				  VALUES ('$cid','$uid')";
		if ($dbhandler->query($query)) {
			$dbhandler->close();
			return $cid;
		}
		$dbhandler->close();
	}
	return 0;
}

function getUid($uname){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];
	$dbhandler = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);
	if ($dbhandler) {
		$query = "SELECT user_id FROM users WHERE username='$uname'";
		$result = $dbhandler->query($query);
		$user = $result->fetch_assoc();
		$dbhandler->close();
		return $user["user_id"];
	}
	$dbhandler->close();
	return "";
}

function getCommunities($uname){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];

	$uid = getUid($uname);

	$dbhandler = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);
	if ($dbhandler) {
		$query = "SELECT community_id, community_name FROM community WHERE community_id IN (SELECT community_id FROM members WHERE user_id='$uid')";
		$result = $dbhandler -> query($query);
		if($result->num_rows == 0){
			$response["number"] = 0;
			$dbhandler->close();
			return $response;
		}

		$response["number"] = $result->num_rows;

		$communities = array();
		$community = array("id" => null, "name" => null);

		while ($row = $result->fetch_assoc()) {
			$community['id'] = $row["community_id"];
			$community['name'] = $row["community_name"];
			array_push($communities, $community);
		}

		$response["communities"] = $communities;
		$dbhandler->close();
		return $response;
	}

	return $communities;
}

function getSuggestions($uname){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];

	$uid = getUid($uname);

	$dbhandler = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);
	if ($dbhandler) {
		$query = "SELECT community_id, community_name FROM community WHERE community_id NOT IN (SELECT community_id FROM members WHERE user_id='$uid')";
		$result = $dbhandler -> query($query);
		$number = 5; 
		if($result->num_rows == 0){
			$response["number"] = 0;
			$dbhandler->close();
			return $response;
		}

		$response["number"] = ($number > $result->num_rows)? $result->num_rows: $number;

		$communities = array();
		$community = array("id" => null, "name" => null);

		while (($row = $result->fetch_assoc()) && $number > 0) {
			$community['id'] = $row["community_id"];
			$community['name'] = $row["community_name"];
			array_push($communities, $community);
			$number -= 1;
		}

		$response["suggestions"] = $communities;
		$dbhandler->close();
		return $response;
	}

	return $communities;
}

function addPost($uname, $cid, $title, $text){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];

	$dbhandler = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);

	$uid = getUid($uname);
	
	if ($dbhandler) {		
		$query = "INSERT INTO posts_info(community, user) 
				  VALUES ('$cid', '$uid')";
		if ($dbhandler->query($query)) {
			$pid = $dbhandler->insert_id; 
			$dbhandler->close();
			addPostData($pid, $title, $text);
			return $pid;
		}
		$dbhandler->close();
	}
	return 0;
}

function addPostData($pid, $title, $text){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];

	$dbhandler = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);
	
	if ($dbhandler) {		
		$query = "INSERT INTO posts_data(post_id, title, text) 
				  VALUES ('$pid', '$title', '$text')";
		if ($dbhandler->query($query)) {
			$dbhandler->close();
			return true;
		}
		$dbhandler->close();
	}
	return false;
}

function getGlobalFeed($uname){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];

	$uid = getUid($uname);

	$dbhandler = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);
	if ($dbhandler) {
		$query = "SELECT community.community_id as community_id, community.community_name as community_name, users.username as username, posts_data.post_id as post_id, posts_data.title as post_title, posts_data.text as post_text, posts_data.score as score, posts_data.comments as comments FROM community, users, posts_info, posts_data WHERE posts_info.post_id = posts_data.post_id AND posts_info.community = community.community_id AND posts_info.user = users.user_id AND community.community_id IN (SELECT community_id FROM members WHERE user_id = $uid) ORDER BY post_id DESC";
		$result = $dbhandler -> query($query);
		
		$response["number"] = $result->num_rows;

		
		if($result->num_rows == 0){
			$dbhandler->close();
			return $response;
		}

		$posts = array();

		while ($row = $result->fetch_assoc()) {
			$community['id'] = $row["community_id"];
			$community['name'] = $row["community_name"];
			$post["community"] = $community;
			$post["by"] = $row["username"];
			$post_data["id"] = $row["post_id"];
			$post_data["title"] = $row["post_title"];
			$post_data["text"] = $row["post_text"];
			$post_data["score"] = $row["score"];
			$post_data["comments"] = $row["comments"];
			$post["post"] = $post_data;
			array_push($posts, $post);
		}

		$response["posts"] = $posts;
		$dbhandler->close();
		return $response;
	}

	return 0;
}

function getCommunityFeed($cid){
	$dbserver = $GLOBALS['dbserver'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];

	$dbhandler = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);
	if ($dbhandler) {
		$query = "SELECT community.community_id as community_id, community.community_name as community_name, users.username as username, posts_data.post_id as post_id, posts_data.title as post_title, posts_data.text as post_text, posts_data.score as score, posts_data.comments as comments FROM community, users, posts_info, posts_data WHERE posts_info.post_id = posts_data.post_id AND posts_info.community = community.community_id AND posts_info.user = users.user_id AND community.community_id = $cid ORDER BY post_id DESC";
		$result = $dbhandler -> query($query);
		
		$response["number"] = $result->num_rows;

		if($result->num_rows == 0){
			$dbhandler->close();
			return $response;
		}

		$posts = array();

		while ($row = $result->fetch_assoc()) {
			$community['id'] = $row["community_id"];
			$community['name'] = $row["community_name"];
			$post["community"] = $community;
			$post["by"] = $row["username"];
			$post_data["id"] = $row["post_id"];
			$post_data["title"] = $row["post_title"];
			$post_data["text"] = $row["post_text"];
			$post_data["score"] = $row["score"];
			$post_data["comments"] = $row["comments"];
			$post["post"] = $post_data;
			array_push($posts, $post);
		}

		$response["posts"] = $posts;
		$dbhandler->close();
		return $response;
	}

	return 0;
}

?>