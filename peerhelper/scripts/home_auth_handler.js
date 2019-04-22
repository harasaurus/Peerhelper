function validate_community_name(community_name){
	if(!community_format_validate(community_name)){
		show_error("create_community_form", "Community name should start with an alphabet");
		return false;
	}
	if(!only_word(community_name)){
		show_error("create_community_form", "Community name should only contain alphabets, numbers or underscore");
		return false;
	}
	return true;

}

function community_create_error_handler(code){
	switch(code){
		case "1":
			show_error("create_community_form", "Community name should start with an alphabet");
		break;
		case "2":
			show_error("create_community_form", "Community name should only contain alphabets, numbers or underscore")
		break;
		case "3":
			show_error("create_community_form", "Username is already in use");
		break;
		default:
			console.log(code);
	}
}

function show_error(element_id, message){
	var element = document.getElementById(element_id);
	element.classList.add("input_invalid");
	element.setAttribute("title", message);
}