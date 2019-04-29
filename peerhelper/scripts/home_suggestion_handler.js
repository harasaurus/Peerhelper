function load_suggestions(){
	$("#home_right_pane").empty();
	$('#home_right_pane').load('./layout/suggestion_pane.html', ()=>{
		community_create_handler();
		add_suggestions();
	});
}

function community_create_handler(){
	$("#create_community_form").on("keypress", (e)=>{
		if(e.which == 13){
			$("#create_community_form").removeClass("input_invalid");
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
  		success: (response)=>{
  			console.log(response);
  			response = JSON.parse(response);
  			if(response.code == "0"){
  				load_feed_selector();
  			}else{
  				community_create_error_handler(response.code);
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
	new_suggestion_item.find("button").on("click",()=>{
		join_community(suggestion.id);
	});

	$("#home_right_pane").append(new_suggestion_item);
}

function join_community(id){
	$.ajax({
		type: "POST",
  		url: "server/joinCommunity.php",
  		data: {
  			cid : id,
  			uname : username
  		},
  		success: (response)=>{
  			if(response == 0){
  				$("#home_left_pane").empty();
  				$("#home_body").empty();
  				$("#home_right_pane").empty();

  				load_body();
  			}
 		}
	});
}