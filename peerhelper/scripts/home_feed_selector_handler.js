function feed_selector_unselect_all(){
	$('.feed_selector_item_selected').removeClass("feed_selector_item_selected");
}

function load_feed_selector(){
	$('#home_right_pane').load('./layout/feed_selector.html', ()=>{
		populate_feed_selector();
	});	
}


function load_suggestions(){
	return;
}

function populate_feed_selector(){
	$.ajax({
  		type: "POST",
  		url: "server/getCommunities.php",
  		data: {
  			uname : username
  		},
  		success: (community_list)=>{
 			feed_selector_layout_setter(JSON.parse(community_list));
  		}
	});
}

function feed_selector_layout_setter(community_list){
	var number = community_list.number;
	if(number == 0){
		return;
	}

	$.ajax({
		type: "GET",
  		url: "server/getResource.php",
  		data: {
  			uri : "../layout/feed_selector_item.html",
  			return : "text"
  		},
  		success: (layout)=>{
 			feed_selector_item_element = layout;
  			set_feed_selector_layout(number, community_list.communities);
  		}
	});

}

function set_feed_selector_layout(number, communities){
	
	for(var community of communities){
		add_to_feed_selector(community);
	}
}

function add_to_feed_selector(community){
	var new_feed_selector_item = $(feed_selector_item_element);

	var community_name = community.name;
	var new_feed_selector_item_id = "feedSelectorItem_" + community.id;
	var new_feed_selector_item_img = "data/images/community/community_" + community.id + ".png";

	new_feed_selector_item.attr("id", new_feed_selector_item_id);
	new_feed_selector_item.find("img").attr("src", new_feed_selector_item_img);
	new_feed_selector_item.find("p").html(community_name);

	$("#home_right_pane").append(new_feed_selector_item);
}
