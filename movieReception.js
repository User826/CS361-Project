

var docBody = document.body;

var buttonRow = document.createElement("div")
docBody.appendChild(buttonRow)

debugger
function movieReception() {
	if (!window.localStorage.getItem("count")) {
		localStorage.setItem("count", Number(1))
	}
	window.localStorage.setItem(localStorage.getItem("count"), document.getElementById("movie_name").value)
	window.localStorage.setItem("count", Number(window.localStorage.getItem("count")) + Number(1))

	// var apiKey = '1c353c91c80e447b8423af1683745b94';
	// var request_movie_section = new XMLHttpRequest();

	// var request_zip = new XMLHttpRequest();


	// var movie_name = document.getElementById("movie_name").value


	// request_movie_section.open("GET", "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + movie_name + "&prop=text%7Csections%7Cdisplaytitle&disabletoc=1", true);




	// request_movie_section.addEventListener('load', function () {
	// 	if (request_movie_section.status < 400) {
	// 		if (request_movie_section.status >= 200) {
	// 			var response_movie = JSON.parse(request_movie_section.responseText);
	// 			for (var prop in response_movie["parse"]["sections"]) {

	// 				if (response_movie["parse"]["sections"][prop]["line"] == "Reception") {
	// 					var sectionID = response_movie["parse"]["sections"][prop]["index"]
	// 					var request_movie_reception = new XMLHttpRequest();
	// 					request_movie_reception.open("GET", "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + movie_name + "&prop=text%7Csections%7Cdisplaytitle&section=" + sectionID + "&disabletoc=1", true);
	// 					request_movie_reception.addEventListener('load', function () {
	// 						if (request_movie_reception.status < 400) {
	// 							if (request_movie_reception.status >= 200) {
	// 								var response_movie_reception = JSON.parse(request_movie_reception.responseText);
	// 								var reception_text = response_movie_reception["parse"]["text"]["*"]


	// 								document.getElementById("results").innerHTML = reception_text;




	// 							}
	// 						}
	// 						else {
	// 							console.log("Error in network request: " + request_movie_reception.statusText);
	// 						}
	// 					})
	// 					request_movie_reception.send(null);


	// 				}

	// 				else if (response_movie["parse"]["sections"][prop]["line"] == "Critical reception") {
	// 					var sectionID = response_movie["parse"]["sections"][prop]["index"]
	// 					var request_movie_reception = new XMLHttpRequest();
	// 					request_movie_reception.open("GET", "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + movie_name + "&prop=text%7Csections%7Cdisplaytitle&section=" + sectionID + "&disabletoc=1", true);
	// 					request_movie_reception.addEventListener('load', function () {
	// 						if (request_movie_reception.status < 400) {
	// 							if (request_movie_reception.status >= 200) {
	// 								var response_movie_reception = JSON.parse(request_movie_reception.responseText);
	// 								var reception_text = response_movie_reception["parse"]["text"]["*"]


	// 								document.getElementById("results").innerHTML = reception_text;

	// 							}
	// 						}
	// 						else {
	// 							console.log("Error in network request: " + request_movie_reception.statusText);
	// 						}
	// 					})
	// 					request_movie_reception.send(null);
	// 				}

	// 			}

	// 		}
	// 	}
	// 	else {
	// 		console.log("Error in network request: " + request_movie_section.statusText);
	// 	}
	// })
	// request_movie_section.send(null);



}

function favorite() {
	favorite_name = document.getElementById("movie_name").value
	window.localStorage.setItem("name", favorite_name)
}

var submitMovie = document.getElementById("store")
submitMovie.addEventListener("click", movieReception)


var favoriteMovie = document.getElementById("favorite")
favoriteMovie.addEventListener("click", favorite)