function add_stylesheet(url){
	$("<link/>", {
   		rel: "stylesheet",
   		type: "text/css",
   		href: url
	}).appendTo("head");
}