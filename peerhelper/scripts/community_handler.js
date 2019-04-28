function goto_community_feed(id, name, from_id){
	load_community_banner(name);
  clear_body();
  show_feeds();
  $(".feed_selector_item_selected").removeClass("feed_selector_item_selected");
  
  feed_selector_unselect_global_feed(id, name);  
  toggle_feed_listeners(id);

	create_post_layout_setter();
	feed_selector_select(id);
	$.ajax({
		type: "GET",
  		url: "server/getPosts.php",
  		data: {
  			uname : username,
  			cid : id
  		},
  		success: (response)=>{
  			feed_layout_setter(JSON.parse(response))
  		}
	});
}

function load_community_banner(name){
  $("#home_header_search").hide();
  $("#header_tag").html(name);
}

function feed_selector_select(id){
  $("#feedSelectorItem_"+id).addClass("feed_selector_item_selected");
  $("#feedSelectorItem_"+id).off();
}

function feed_selector_unselect_global_feed(id, name){
  $("#feed_selector_global").removeClass("feed_selector_item_selected");
  $("#feed_selector_global").off();
  $("#feed_selector_global").on("click",()=>{
    toggle_global_feed_selector(id, name);
  });
}

function toggle_feed_listeners(id){
  $(".feed_selector_community").off();
  $(".feed_selector_community").each((index, element)=>{
    var esid = $(element).attr("id");
    var i = esid.indexOf("_") + 1;
    var fsid = esid.substring(i);
    var fsname = $(element).find("p").html();
    $(element).on("click",()=>{
      console.log("goto_community_feed(",fsid,",", fsname,",", id,");"); 
      goto_community_feed(fsid, fsname, id);
    });
  });
}

function toggle_global_feed_selector(id, name){
  $("#feed_selector_global").off();
  $("#home_header_search").show();
  $("#header_tag").html("PEERHELPER");
  clear_feeds();

  $("#feedSelectorItem_"+id).removeClass("feed_selector_item_selected");
  $("#feed_selector_global").addClass("feed_selector_item_selected");
  load_suggestions();
  $("#feedSelectorItem_"+id).on("click", ()=>{
    console.log("goto_community_feed(",id,",", name,", 0)");
    goto_community_feed(id, name, 0);
  });
  load_feeds();
}