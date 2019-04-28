function create_post_layout_setter(){
	$("#home_right_pane").empty();
	$.ajax({
		type: "GET",
  		url: "server/getResource.php",
  		data: {
  			uri : "../layout/create_post_layout.html",
  			return : "text"
  		},
  		success: (layout)=>{
  			set_create_post_button(layout);
		}
	});	
}

function set_create_post_button(layout){
  var new_element = $(layout);
  $("#home_right_pane").append(layout);
  $("#create_post_btn").on("click",()=>{
    set_post_creator();
  });
}

function set_post_creator(){
  $.ajax({
      type: "GET",
      url: "server/getResource.php",
      data: {
        uri : "../layout/post_creator_layout.html",
        return : "text"
      },
      success: (layout)=>{
        $("#post_body").empty();
        $("#home_right_pane").empty();
        add_listener();
        show_post();
        add_post_creator(layout);
    }
  }); 
}

function add_listener(){
  $(".feed_selector_item_selected").on("click",()=>{
    $(".feed_selector_item_selected").off();
    $("#post_body").empty();
    show_community_feed();
  });
}

function add_post_creator(layout){
  $("#post_body").append(layout);
  $("#post_create_submit").on("click",()=>{
    create_post();
  });
}

function create_post(){
  var post_title = document.getElementById("post_create_title").value.trim();
  var post_img = document.getElementById("post_create_img").value;
  var post_text = document.getElementById("post_create_text").value.trim();
  var community_element_id = $(".feed_selector_item_selected").attr("id");
  var community_id = community_element_id.substring(community_element_id.indexOf("_") + 1);
  if(validate_post(post_title, post_img, post_text)){
    $.ajax({
        type: 'POST',
        url: "server/createPost.php",
        data: {
              uname : username,
              cid : community_id,
              title : post_title,
              text : post_text
            },
        success: (response)=> {
          console.log(response);
          if(response != 0){
            goto_post(response);
          }
        }
    });
  }
}

function goto_post(post_id){
}