var query = function(params) {
	var items = [];

	for (key in params) {
		items.push(key + "=" + encodeURIComponent(params[key]));
	}

	return items.length ? "?" + items.join("&") : "";
}

var get = function(url, params, successHandler) {
	var xhr = new XMLHttpRequest;
	xhr.open("GET", url + query(params));
	xhr.onload = successHandler
	xhr.send();
}

var matches = location.search.match(/label=(.+)/);
var label = matches ? decodeURIComponent(matches[1]) : "";

var year = (new Date()).getFullYear();
var years = year + "-" + (year - 3);

get("http://ws.spotify.com/search/1/album.json", { q: "label:\"" + label + "\" year:" + years }, function() {
	var data = JSON.parse(this.response);

	var albums = document.createElement("div");

	data.albums.forEach(function(item) {
		var link = document.createElement("a");
		link.setAttribute("href", item.href);
		link.textContent = item.artists[0].name + " - " + item.name;

		var album = document.createElement("div");
		album.appendChild(link);

		albums.appendChild(album);
	});

	document.body.appendChild(albums);
});
