function signup_validation(){

}

function login_validation(){
	
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