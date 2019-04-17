function initialize(){
	var landing_signup_confirm_btn = document.getElementById("signup_submit");
	var landing_login_confirm_btn = document.getElementById("login_submit");

	landing_signup_confirm_btn.addEventListener("click", signup_validation);
	landing_login_confirm_btn.addEventListener("click", login_validation);

	$("#landing_signup_container").hide();
	$("#landing_login_container").hide();
}

function add_listeners_to_header(){
	var signup_btn = document.getElementById("land-signup-button");
	var login_btn = document.getElementById("land-login-button");

	signup_btn.addEventListener("click",signup_clicked);

	login_btn.addEventListener("click",login_clicked);
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

function remove_errors_signup(){
	remove_error("signup_fname");
	remove_error("signup_lname");
	remove_error("signup_uname");
	remove_error("signup_email");
	remove_error("signup_pass");
	remove_error("signup_repass");
}

function remove_errors_login(){
	remove_error("login_uname");
	remove_error("login_pass");
}

function remove_error(element_id){
	var element = document.getElementById(element_id);
	element.classList.remove("form_input_invalid");
	element.setAttribute("title", "");
}

function show_error(element_id, message){
	var element = document.getElementById(element_id);
	element.classList.add("form_input_invalid");
	element.setAttribute("title", message);
}