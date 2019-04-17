function length_validate(text, min, max){
	if((text.length < min) || (text.length > max)){
		return false;
	}
	return true
}

function only_alphabets(text){
	if(text.match(/^[a-z]*$/)){
		return true;
	}
	return false;
}

function only_word(text){
	if(text.match(/^[\w]*$/)){
		return true;
	}
	return false;
}

function only_safe_font(text){
	if(text.match(/^[a-zA-Z0-9@#$!?_]*$/)){
		return true;
	}
	return false;
}

function email_format_validate(text){
	if(text.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
		return true;
	}
	return false;
}

function password_format_validate(text){
	if(text.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]$/)){
		return true;
	}
	return false;
}

function username_format_validate(text){
	var character = text.charAt(0);
	if(character.match(/^[a-zA-Z_]$/)){
		return true;
	}
	return false;
}