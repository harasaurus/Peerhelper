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

function add_post_to_feed(post){
  var new_feed_item = $(feed_item_element);

  var community_name = post.community.name;
  var community_img = "data/images/community/community_" + post.community.id + ".png";
  
  var post_by = post.by;
  //var post_time = post.on;

  var item_id = "feedItem_" + post.post.id;
  var item_img = "url('data/images/post/post_" + post.post.id + ".jpg')";
  var item_title = post.post.title;
  var item_content = post.post.text;

  new_feed_item.attr("id", item_id);
  
  new_feed_item.find(".feed_item_community_img").attr("src", community_img);
  new_feed_item.find(".post_community").html(community_name);
  new_feed_item.find(".post_user").html(post_by);
  //new_feed_item.find(".post_date").html(post_time);

  new_feed_item.find(".post_image").css("background-image", item_img);
  new_feed_item.find(".title_name").html(item_title);
  new_feed_item.find(".post_content").html(item_content);

  $("#home_body").prepend(new_feed_item);
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