function read_get(parameter){
	var url = window.location.toString();

	var queryStart = url.indexOf("?") + 1;
	var queryEnd   = url.indexOf("#") + 1 || url.length + 1;
    var query = url.slice(queryStart, queryEnd - 1);
    var pairs = query.replace(/\+/g, " ").split("&");
    var parms = {};
    var i, n, v, nv;

    if (query === url || query === ""){
    	return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;

}