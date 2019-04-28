function initialize(){
	show_feeds();
	load_header();
	load_body();
}

function load_header(){
	$('#home_header').load('./layout/home_header.html', ()=>{
		add_listeners_to_header();
	});	
}

function load_body(){
	load_feed_selector();
	load_feeds();
	load_suggestions();
}