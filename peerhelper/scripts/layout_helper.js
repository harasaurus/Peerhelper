function add_stylesheet(url){
	$("<link/>", {
   		rel: "stylesheet",
   		type: "text/css",
   		href: url
	}).appendTo("head");
}

function show_search_results(){
	$("#home_body").hide();
	$("#search_body").show();
}
function show_feeds(){
	$("#home_body").show();
	$("#search_body").hide();
}

function clear_search_results(){
	$("#search_body").empty();	
}

function goto_community_feed(name){
	window.location = "./community.html?uname=" + username + "&cname=" + name; 
}

function goto_post(community_name, post_id){
	window.location = "./community.html?uname=" + username + "&cname=" + name + "&pid=" + post_id;
}