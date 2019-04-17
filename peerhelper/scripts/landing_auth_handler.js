function signup_validation(){
	var fname = document.getElementById("signup_fname").value.trim().toLowerCase();
	var lname = document.getElementById("signup_lname").value.trim().toLowerCase();
	var uname = document.getElementById("signup_uname").value.trim();
	var email = document.getElementById("signup_email").value.trim().toLowerCase();
	var pass = document.getElementById("signup_pass").value;
	var repass = document.getElementById("signup_repass").value;

	remove_errors_signup();

	if(validate_signup_info(fname, lname, uname, email, pass, repass)){
		signup(fname, lname, uname, email, pass, repass);				
	}
}

function login_validation(){
	var uname = document.getElementById("login_uname").value.trim();
	var password = document.getElementById("login_pass").value;

	remove_errors_login();

	if(validate_login_credential(uname, password)){
		login(uname, password);
	}
}

function validate_signup_info(fname, lname, uname, email, pass, repass){
	var validated = true;
	if(!fname){
		validated = false;
		show_error("signup_fname", "First name is mandatory");
	}else if(!length_validate(fname, 1, 15)){
		validated = false;
		show_error("signup_fname", "First name should not be more than 15 characters");
	}else if(!only_alphabets(fname)){
		validated = false;
		show_error("signup_fname", "First name should only contain alphabets");
	}

	if(!length_validate(lname, 0, 15)){
		validated = false;
		show_error("signup_lname", "Last name should not be more than 15 characters");
	}else if(!only_alphabets(lname)){
		validated = false;
		show_error("signup_lname", "Last name should only contain alphabets");
	}

	if(!uname){
		validated = false;
		show_error("signup_uname", "Username is mandatory");
	}else if(!length_validate(uname, 1, 15)){
		validated = false;
		show_error("signup_uname", "Username should not be more than 15 characters");
	}else if(!username_format_validate(uname)){
		validated = false;
		show_error("signup_uname", "Username should start with an alphabet or underscore");
	}else if(!only_word(uname)){
		validated = false;
		show_error("signup_uname", "Username should only contain alphabets, numbers or underscore");
	}

	if(!email){
		validated = false;
		show_error("signup_email", "Email is mandatory");
	}else if(!email_format_validate(email)){
		validated = false;
		show_error("signup_email", "Email format is invalid")
	}

	if(!pass){
		validated = false;
		show_error("signup_pass", "Password is mandatory");
		show_error("signup_repass", "Password is mandatory");
	}else if(pass != repass){
		validated = false;
		show_error("signup_pass", "Passwords do not match");
		show_error("signup_repass", "Passwords do not match");
	}else if(!length_validate(pass, 7, 15)){
		validated = false;
		show_error("signup_pass", "Password should be 8 to 15 character long");
		show_error("signup_repass", "Password should be 8 to 15 character long");	
	}else if(!password_format_validate(pass)){
		validated = false;
		show_error("signup_pass", "Password should contain at least one lowercase, one uppercase and one number");
		show_error("signup_repass", "Password should contain at least one lowercase, one uppercase and one number");
	}else if(!only_safe_font(pass)){
		validated = false;
		show_error("signup_pass", "Password should only contain alphabets, number or [@#$!?_]");
		show_error("signup_repass", "Password should only contain alphabets, number or [@#$!?_]")
	}

	return validated;
}

function validate_login_credential(uname, password){
	var validated = true;
	
	if(!uname){
		validated = false;
		show_error("login_uname", "Username is required");
	}

	if(!password){
		validated = false;
		show_error("login_pass", "Password is required");
	}	
}

function signup(fname, lname, uname, email, pass, repass){
	$.ajax({
  		type: "POST",
  		url: "server/signup.php",
  		data: {
  			fname: fname,
  			lname: lname,
  			uname: uname, 
  			email: email,
  			password: pass,
  			repassword: repass
  		},
  		success: (code)=>{
 			if(code == "0"){
 				window.location = "./home.html?uname=" + uname;
 			}else{
 				signup_error_handler(code);
 			}
  		},
	});
}

function login(uname, password){
	$.ajax({
  		type: "POST",
  		url: "server/login.php",
  		data: {
  			uname: uname, 
  			password: password,
  		},
  		success: (code)=>{
 			if(code == "0"){
 				window.location = "./home.html?uname=" + uname;
 			}else{
 				login_error_handler(code);
  			}
  		}
	});
}

function signup_error_handler(code){
	for(i = 0; i < 4; i++){
		signup_error_code_handler(i, code.charAt(i));
	}

	signup_password_error_handler(code.charAt(4), code.charAt(5));
}

function login_error_handler(code){
	switch(code){
		case "1":
			show_error("login_uname", "Username is mandatory");
		break;

		case "2":
			show_error("login_uname", "Password is mandatory");
		break;

		case "3":
			show_error("login_uname", "Username not found");
		break;

		case "4":
			show_error("login_uname", "Wrong password");
		break;
		default:
			console.log("error_code=", error_code);
			return;
	}
}

function signup_error_code_handler(field, error_code){
	var element_id;
	var message;

	switch(field){
		case "0":
			element_id = "signup_fname";
			switch(error_code){
				case "0":
					return;
				break;
				case "1":
					message = "First name is mandatory";
				break;
				case "3":
					message = "First name should not be more than 15 characters";
				break;
				case "5":
					message = "First name should only contain alphabets";
				break;
				default:
					console.log("error_code=", error_code)
					return;
			}
		break;

		case "1":
			element_id = "signup_lname";
			switch(error_code){
				case "0":
					return;
				break;
				case "3":
					message = "Last name should not be more than 15 characters";
				break;
				case "5":
					message = "Last name should only contain alphabets";
				break;
				default:
					console.log("error_code=", error_code)
					return;
			}
		break;

		case "2":
			element_id = "signup_uname";
			switch(error_code){
				case "0":
					return;
				break;
				case "1":
					message = "Username is mandatory";
				break;
				case "3":
					message = "Username should not be more than 15 characters";
				break;
				case "4":
					message = "Username should start with an alphabet or underscore";
				break;
				case "5":
					message = "Username should only contain alphabets, numbers or underscore";
				break;
				case "6":
					message = "Username is already in use";
				break;
				default:
					console.log("error_code=", error_code)
					return;
			}
		break;

		case "3":
			element_id = "signup_email";
			switch(error_code){
				case "0":
					return;
				break;
				case "1":
					message = "Email is mandatory";
				break;
				case "4":
					message = "Email format is invalid";
				break;
				case "6":
					message = "Email is already in use";
				break;
				default:
					console.log("error_code=", error_code)
					return;
			}
		break;
		
		default:
			console.log("Field=", field);
			return;
	}

	show_error(element_id, message);
}

function signup_password_error_handler(pass_error, repass_error){
	var message;
	
	if (pass_error == 1){
		show_error("signup_pass", "Password is mandatory");
		show_error("signup_repass", "Password is mandatory");
		return;
	}else if(pass_error != 0){
		console.log("pass_error=",pass_error);
		return;
	}

	switch(repass_error){
		case "0":
			return;
		break;
		case "2":
			message = "Passwords do not match";
		break;
		case "3":
			message = "Password should be 8 to 15 character long";
		break;
		case "4":
			message = "Password should contain at least one lowercase, one uppercase and one number";
		break;
		case "5":
			message = "Password should only contain alphabets, number or [@#$!?_]";
		break;
		default:
			console.log("error_code=", error_code)
		return;
	}
	show_error("signup_pass", message);
	show_error("signup_repass", message);
}