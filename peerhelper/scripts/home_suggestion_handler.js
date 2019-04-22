function load_suggestions(){
	$('#home_right_pane').load('./layout/suggestion_pane.html', ()=>{
		community_create_handler();
		add_suggestions();
	});
}

function community_create_handler(){
	$("#create_community_form").on("keypress", (e)=>{
		if(e.which == 13){
			get_community_name();
		}
	});
}

function get_community_name(){
	var community_name = document.getElementById("create_community_form").value.trim();

	if(!validate_community_name(community_name)){
		return;
	}

	$.ajax({
		type: "POST",
  		url: "server/createCommunity.php",
  		data: {
  			cname : community_name,
  			uname : username
  		},
  		success: (code)=>{
  			if(code == "0"){
  				goto_community_feed(community_name);
  			}else{
  				community_create_error_handler(code);
  			}
 		}
	});
}

function add_suggestions(){
	$.ajax({
  		type: "POST",
  		url: "server/getSuggestions.php",
  		data: {
  			uname : username
  		},
  		success: (suggestions)=>{
 			suggestion_layout_setter(JSON.parse(suggestions));
  		}
	});
}

function suggestion_layout_setter(suggestions){
	if(suggestions.number == 0){
		return;
	}

	$.ajax({
		type: "GET",
  		url: "server/getResource.php",
  		data: {
  			uri : "../layout/suggestion_item.html",
  			return : "text"
  		},
  		success: (layout)=>{
  			suggestion_item_element = layout;
			set_suggestion_layout(suggestions.suggestions);
		}
	});
}

function set_suggestion_layout(suggestions){
	for(var suggestion of suggestions){
		add_to_suggestions(suggestion);
	}
}

function add_to_suggestions(suggestion){
	var new_suggestion_item = $(suggestion_item_element);

	var img_src = "data/images/community/community_" + suggestion.id + ".png";
	var community_name = suggestion.name;
	var join_btn_id = "suggestionItem_" + suggestion.id;

	new_suggestion_item.find("img").attr("src", img_src);
	new_suggestion_item.find("p").html(community_name);
	new_suggestion_item.find("button").attr("id", join_btn_id);

	$("#home_right_pane").append(new_suggestion_item);
}