function load_feeds(){
	$.ajax({
		type: "GET",
  		url: "server/getPosts.php",
  		data: {
  			uname : username,
  			cid : 0
  		},
  		success: (response)=>{
  			console.log(response);
  			feed_layout_setter(JSON.parse(response));
  		}
	});
}

function feed_layout_setter(response){
	if(response.number == 0){
		set_empty_feed_layout();
	}else{
		set_feed_layout(response.posts);
	}
}

function set_empty_feed_layout(){
	$.ajax({
      type: "GET",
      url: "server/getResource.php",
      data: {
        uri : "../layout/feed_empty.html",
        return : "text"
      },
      success: (layout)=>{
        $("#home_body").append(layout);
      }
  });

}

function set_feed_layout(posts){
	$.ajax({
      type: "GET",
      url: "server/getResource.php",
      data: {
        uri : "../layout/feed_item.html",
        return : "text"
      },
      success: (layout)=>{
      	feed_item_element = layout;
        add_feeds(posts);
      }
  });

}

function add_feeds(posts){
	for(var post of posts){
		add_to_feed(post);
	}
}

function add_to_feed(post){
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

	$("#home_body").append(new_feed_item);
}
