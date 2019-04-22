function add_listeners_to_header(){
	$('#home_header_avatar').on("click", ()=>{
		logout();
	});
	$('#home_header_search').on("keypress", (e)=>{
		if(e.which == 13){
			header_search();
		}
	});
	
}

function logout(){
	window.location = "./index.html";
}

function header_search(){
	var search_item = document.getElementById("home_header_search").value.trim().toLowerCase();

	$.ajax({
		type: "POST",
  		url: "server/search.php",
  		data: {
  			query : search_item,
  			uname : username
  		},
  		success: (result)=>{
  			feed_selector_unselect_global();
  			show_search_results();
  			clear_search_results();
 			search_result_layout_setter(JSON.parse(result));
 		}
	});
}