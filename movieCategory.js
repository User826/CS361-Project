

var docBody = document.body;

var buttonRow = document.createElement("div")
docBody.appendChild(buttonRow)

debugger
function movieCategory() {



	var apiKey = '1c353c91c80e447b8423af1683745b94';
	var request_movie_category = new XMLHttpRequest();

	var request_zip = new XMLHttpRequest();


	var category_name = document.getElementById("categoryName").value
	// var section_name = document.getElementById("section").value

	if (category_name == "Action") {

		category_name = "List of action films of the 2010s"
		request_movie_category.open("GET", "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + category_name + "&prop=text%7Csections%7Cdisplaytitle&disabletoc=1", true);




		request_movie_category.addEventListener('load', function () {
			if (request_movie_category.status < 400) {
				if (request_movie_category.status >= 200) {
					var response_movie = JSON.parse(request_movie_category.responseText);
					for (var prop in response_movie["parse"]["sections"]) {

						var section_name = "2010"
						if (response_movie["parse"]["sections"][prop]["line"] == section_name) {
							var sectionID = response_movie["parse"]["sections"][prop]["index"]

							var request_movie_reception = new XMLHttpRequest();
							request_movie_reception.open("GET", "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + category_name + "&prop=text%7Csections%7Cdisplaytitle&section=" + sectionID + "&disabletoc=1", true);
							request_movie_reception.addEventListener('load', function () {
								if (request_movie_reception.status < 400) {
									if (request_movie_reception.status >= 200) {
										var response_movie_reception = JSON.parse(request_movie_reception.responseText);
										var reception_text = response_movie_reception["parse"]["text"]["*"]


										document.getElementById("results").innerHTML = reception_text;



										var downloadTextRequest = new XMLHttpRequest();

										var downloadText = document.getElementById("results").innerText
										console.log(downloadText)


										downloadTextRequest.open("POST", "http://flip1.engr.oregonstate.edu:8264/past-searches", true);
										downloadTextRequest.setRequestHeader('Content-Type', 'application/json');


										downloadTextRequest.addEventListener('load', function () {
											if (downloadTextRequest.status < 400) {
												if (downloadTextRequest.status >= 200) {
													console.log("Test")
													// 	var response_JSON = JSON.parse(downloadText.responseText);
													// document.getElementByID("downloadText").textContent=JSON.stringify(response_JSON, null, '  ')
													
												}
											}
											else {
												console.log("Error in network request: " + downloadTextRequest.statusText);
											}
										})
										downloadTextRequest.send(JSON.stringify({
											text: downloadText
										}));



									}
								}
								else {
									console.log("Error in network request: " + request_movie_reception.statusText);
								}
							})
							request_movie_reception.send(null);

						}

					}

				}
			}
			else {
				console.log("Error in network request: " + request_movie_category.statusText);
			}
		})
		request_movie_category.send(null);

	}

	request_movie_category.open("GET", "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + category_name + "&prop=text%7Csections%7Cdisplaytitle&disabletoc=1", true);




	request_movie_category.addEventListener('load', function () {
		if (request_movie_category.status < 400) {
			if (request_movie_category.status >= 200) {
				var response_movie = JSON.parse(request_movie_category.responseText);
				for (var prop in response_movie["parse"]["sections"]) {

					if (response_movie["parse"]["sections"][prop]["line"] == section_name) {
						var sectionID = response_movie["parse"]["sections"][prop]["index"]

						var request_movie_reception = new XMLHttpRequest();
						request_movie_reception.open("GET", "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + category_name + "&prop=text%7Csections%7Cdisplaytitle&section=" + sectionID + "&disabletoc=1", true);
						request_movie_reception.addEventListener('load', function () {
							if (request_movie_reception.status < 400) {
								if (request_movie_reception.status >= 200) {
									var response_movie_reception = JSON.parse(request_movie_reception.responseText);
									var reception_text = response_movie_reception["parse"]["text"]["*"]


									document.getElementById("results").innerHTML = reception_text;



									var downloadTextRequest = new XMLHttpRequest();

									var downloadText = document.getElementById("results").innerText
									console.log(downloadText)


									downloadTextRequest.open("POST", "http://flip1.engr.oregonstate.edu:8264/past-searches", true);
									downloadTextRequest.setRequestHeader('Content-Type', 'application/json');


									downloadTextRequest.addEventListener('load', function () {
										if (downloadTextRequest.status < 400) {
											if (downloadTextRequest.status >= 200) {
												console.log("Test")
												// 	var response_JSON = JSON.parse(downloadText.responseText);
												// document.getElementByID("downloadText").textContent=JSON.stringify(response_JSON, null, '  ')
											}
										}
										else {
											console.log("Error in network request: " + downloadTextRequest.statusText);
										}
									})
									downloadTextRequest.send(JSON.stringify({
										text: downloadText
									}));



								}
							}
							else {
								console.log("Error in network request: " + request_movie_reception.statusText);
							}
						})
						request_movie_reception.send(null);

					}

				}

			}
		}
		else {
			console.log("Error in network request: " + request_movie_category.statusText);
		}
	})
	request_movie_category.send(null);


}


var submitMovie = document.getElementById("movie")
submitMovie.addEventListener("click", movieCategory)