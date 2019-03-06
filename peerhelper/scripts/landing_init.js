function signup(fname, lname, uname, email, pass, repass){

}

function login(uname, password){

}

function show_error(element_id, message){
	var element = document.getElementById(element_id);
	element.innerHTML = message;
}

function remove_error(element_id){
	var element = document.getElementById(element_id);
	element.innerHTML = null;
}

function remove_errors_signup(){
	remove_error("signup_fname_error");
	remove_error("signup_lname_error");
	remove_error("signup_uname_error");
	remove_error("signup_email_error");
	remove_error("signup_pass_error");
	remove_error("signup_repass_error");
}

function remove_errors_login(){
	remove_error("login_uname_error");
	remove_error("login_pass_error");
}

function validate_info(fname, lname, uname, email, pass, repass){
	var validated = true;
	if(!fname){
		validated = false;
		show_error("signup_fname_error", "Field is required");
	}

	if(!uname){
		validated = false;
		show_error("signup_uname_error", "Field is required");
	}

	if(!email){
		validated = false;
		show_error("signup_email_error", "Field is required");
	}

	if(!pass){
		validated = false;
		show_error("signup_pass_error", "Field is required");
	}

	if(!repass){
		validated = false;
		show_error("signup_repass_error", "Field is required");
	}

	return validated;
}

function validate_credential(uname, password){
	var validated = true;
	
	if(!uname){
		validated = false;
		show_error("login_uname_error", "Field is required");
	}

	if(!password){
		validated = false;
		show_error("login_pass_error", "Field is required");
	}	
}

function signup_validation(){
	var fname = document.getElementById("signup_fname").value;
	var lname = document.getElementById("signup_lname").value;
	var uname = document.getElementById("signup_uname").value;
	var email = document.getElementById("signup_email").value;
	var pass = document.getElementById("signup_pass").value;
	var repass = document.getElementById("signup_repass").value;

	remove_errors_signup();

	if(validate_info(fname, lname, uname, email, pass, repass)){
		signup(fname, lname, uname, email, pass, repass);				
	}
}

function login_validation(){
	var uname = document.getElementById("login_uname").value;
	var password = document.getElementById("login_pass").value;

	remove_errors_login();

	if(validate_credential(uname, password)){
		login(uname, password);
	}
}

function signup_clicked(){
	//remove all previous UI tasks
	//perform all the task regarding UI
	$("#slideshow_container").hide();
	$("#landing_signup_container").show();
	$("#landing_login_container").hide();
}

function login_clicked(){
	//remove all previous UI tasks
	//perform all the tasks regarding UI
	$("#slideshow_container").hide();
	$("#landing_signup_container").hide();
	$("#landing_login_container").show();
}

function add_listeners(){
	var signup_btn = document.getElementById("land-signup-button");
	var login_btn = document.getElementById("land-login-button");

	signup_btn.addEventListener("click",signup_clicked);

	login_btn.addEventListener("click",login_clicked);
}

function initialize(){
	var landing_signup_confirm_btn = document.getElementById("signup_submit");
	var landing_login_confirm_btn = document.getElementById("login_submit");

	landing_signup_confirm_btn.addEventListener("click", signup_validation);
	landing_login_confirm_btn.addEventListener("click", login_validation);

	$("#landing_signup_container").hide();
	$("#landing_login_container").hide();
}

window.onload = ()=>{
	initialize();
	add_listeners();
};