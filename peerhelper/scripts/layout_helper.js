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
	$("#post_body").hide();
}

function show_feeds(){
	$("#home_body").show();
	$("#search_body").hide();
	$("#post_body").hide();
}

function clear_search_results(){
	$("#search_body").empty();	
}

function clear_body(){
	$("#home_body").empty();
	$("#search_body").empty();
	$("#post_body").empty();
}

function show_community_feed(){
	$("#home_body").show();
	$("#post_body").hide();
}

function show_post(){
	$("#home_body").hide();
	$("#post_body").show();
}

function clear_feeds(){
	$("#home_body").empty();
	show_feeds();
}