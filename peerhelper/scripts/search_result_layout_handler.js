function search_result_layout_setter(results){
	var number_of_results = results.number;

	if(number_of_results == 0){
		set_empty_result_layout();
		return;
	}

	set_search_result_layout(result.search_items);
}

function set_empty_result_layout(){
	$.ajax({
      type: "GET",
      url: "server/getResource.php",
      data: {
        uri : "../layout/search_empty.html",
        return : "text"
      },
      success: (layout)=>{
        $("#search_body").append(layout);
      }
  });
}

function set_search_result_layout(items){
	$.ajax({
      type: "GET",
      url: "server/getResource.php",
      data: {
        uri : "../layout/search_item.html",
        return : "text"
      },
      success: (layout)=>{
      	search_item_element = layout;
        add_search_items(items);
      }
  });
}

function add_search_items(items){
	for(item of items){
		add_search_item(item);
	}
}

function add_search_item(item){
	var new_search_item = $(search_item_element);

	var item_img = "data/images/community/community_" + item.id + ".png";
	var item_name = item.name;
	var item_btn_id = "searchItemBtn_" + item.id;
	var item_btn_class = (item.is_member)? "search_result_joined" : "search_result_not_joined";

	new_search_item.find("img").attr("src", item_img);
	new_search_item.find("p").html(item_name);
	new_search_item.find("button").attr("id", item_btn_id);
	new_search_item.find("button").addClass(item_btn_class);

	$("#search_body").append(new_search_item);
}