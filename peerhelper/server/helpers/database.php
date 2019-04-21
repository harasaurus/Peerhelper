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

?>