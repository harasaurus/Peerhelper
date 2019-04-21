function search_result_layout_setter(result){
	var number_of_results = result.number;

	if(number_of_results == 0){
		set_search_result_layout(0);
		return;
	}

	set_search_result_layout(number_of_result, result.search_items);
}

function set_search_result_layout(number_of_result, search_items){
	if(number_of_result == 0){
		add_to_search_result(0);
		return;
	}

	for(i = 0; i < number_of_result; i++){
		add_to_search_result(search_items[0]);
	}
}