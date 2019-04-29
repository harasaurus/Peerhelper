function validate_community_name(community_name){
	if(!community_format_validate(community_name)){
		show_error("create_community_form", "Community name should start with an alphabet");
		return false;
	}
	if(!length_validate(community_name, 0, 15)){
		show_error("create_community_form", "Community name should not be more than 15 characters");
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
		case "4":
			show_error("create_community_form", "Community name should not be more than 15 characters");
		break;
		default:
			console.log(code);
	}
}

function validate_post(post_title, post_img, post_text){
	var validated = true;
	remove_post_create_errors();

	if(!post_title){
		show_post_create_error("post_create_title", "Title is required");
		validated = false;
	}else if(!length_validate(post_title, 0, 255)){
		show_post_create_error("post_create_title", "Title should not be more than 255 characters");
		validated = false;
	}

	if(!post_image_format_validate(post_img)){
		show_post_create_error("post_create_img", "Image should be of jp(e)g format only");
		validated = false;
	}

	if(!post_text){
		show_post_create_error("post_create_text", "Text is required");
		validated = false;
	}

	return validated;
}

function show_error(element_id, message){
	var element = document.getElementById(element_id);
	element.classList.add("input_invalid");
	element.setAttribute("title", message);
}

function show_post_create_error(id, message){
	var element = document.getElementById(id);
	element.classList.add("post_create_error");
	element.setAttribute("title", message);
}

function remove_post_create_errors(){
	var element = document.getElementById("post_create_title");
	element.classList.remove("post_create_error");
	element.setAttribute("title", "");

	element = document.getElementById("post_create_text");
	element.classList.remove("post_create_error");
	element.setAttribute("title", "");
}