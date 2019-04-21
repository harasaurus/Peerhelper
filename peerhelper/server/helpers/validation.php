<?php
	function validateFname($fname){
		return "0";
	}

	function validateLname($lname){
		return "0";
	}

	function validateUname($uname){
		if(userExist($uname)){
			return "6";
		}
		return "0";
	}

	function validateEmail($email){
		if(emailExist($email)){
			return "6";
		}
		return "0";
	}

	function validatePass($pass){
		return "0";
	}

	function validationRepass($repass){
		return 0;
	}

	function validateLoginCredential($username, $password){
		return matchCredentials($username, $password);
	}
?>