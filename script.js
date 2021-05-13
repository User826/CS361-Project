

var docBody=document.body;

var buttonRow= document.createElement("div")
docBody.appendChild(buttonRow)

debugger
function weatherCity(){
	var apiKey='1c353c91c80e447b8423af1683745b94';
	var request_movie_section=new XMLHttpRequest();

	var request_zip=new XMLHttpRequest();


	var movie_name=document.getElementById("movie_name").value
	// var table_city=document.getElementById("table_city").textContent=movie_name
	
	// var country_code=document.getElementById("city_country_code").value

	request_movie_section.open("GET", "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&format=json&page="+movie_name+"&prop=text%7Csections%7Cdisplaytitle&disabletoc=1", true);


	

        request_movie_section.addEventListener('load',function(){
         	if(request_movie_section.status < 400){
		if (request_movie_section.status >= 200){
        	var response_movie = JSON.parse(request_movie_section.responseText);
			for (var prop in response_movie["parse"]["sections"]){
				
				if (response_movie["parse"]["sections"][prop]["line"]=="Reception") {
					var sectionID= response_movie["parse"]["sections"][prop]["index"]
					var request_movie_reception=new XMLHttpRequest();
					request_movie_reception.open("GET", "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&format=json&page="+movie_name+"&prop=text%7Csections%7Cdisplaytitle&section="+sectionID+"&disabletoc=1", true);
					request_movie_reception.addEventListener('load',function(){
						 if(request_movie_reception.status < 400){
							if (request_movie_reception.status >= 200){
								var response_movie_reception = JSON.parse(request_movie_reception.responseText);
								var reception_text = response_movie_reception["parse"]["text"]["*"]
								// var reception_text_object = document.createElement('div');
								// reception_text_object.innerHTML = reception_text;
								// var docBody = document.body;
								// docBody.appendChild(reception_text_object)
						
								document.getElementById("cityJSONToString").innerHTML=reception_text;
								
							}
						}
						else {
							console.log("Error in network request: " + request_movie_reception.statusText);
						}
					})	
				request_movie_reception.send(null);

			
				}

			}
		//	document.getElementById("cityJSONToString").textContent=JSON.stringify(response_movie_section, null, '  ')
			}
		}
		else {
        		console.log("Error in network request: " + request_movie_section.statusText);
      		}
	})
	request_movie_section.send(null);
	
	
	
}


var submitButtonCity = document.getElementById("submit_city")
submitButtonCity.addEventListener("click", weatherCity)

// function weatherZip(){
// 	var apiKey='1c353c91c80e447b8423af1683745b94';
	
// 	var request_zip=new XMLHttpRequest();

// 	var zip_code=document.getElementById("zip_code").value
	
// 	var country_code=document.getElementById("zip_country_code").value

// 	request_zip.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+zip_code+","+country_code+"&appid="+apiKey, true);
	

//         request_zip.addEventListener('load',function(){
//          	if(request_zip.status < 400){
// 		if (request_zip.status >= 200){
//         		var response_zip = JSON.parse(request_zip.responseText);
// 			document.getElementById("zipJSONToString").textContent=JSON.stringify(response_zip, null, '  ')
// 			}
// 		}
// 		else {
//         		console.log("Error in network request: " + request_zip.statusText);
//       		}
// 	})
// 	request_zip.send(null);
	
// 	var table_zip=document.getElementById("table_zip").textContent=zip_code
// }


// var submitButtonZip = document.getElementById("submit_zip")
// submitButtonZip.addEventListener("click", weatherZip) 


// function sendJSON(){
		
// 	var request_JSON=new XMLHttpRequest();

// 	var JSON_input=document.getElementById("JSON_input").value
// 	var payload={data:null}
// 	payload.data=JSON_input

// 	request_JSON.open("POST", "http://httpbin.org/post", true);
// 	request_JSON.setRequestHeader('Content-Type', 'application/json');
	

//         request_JSON.addEventListener('load',function(){
//          	if(request_JSON.status < 400){
// 		if (request_JSON.status >= 200){
//         		var response_JSON = JSON.parse(request_JSON.responseText);
// 			document.getElementById("result").textContent=JSON.stringify(response_JSON, null, '  ')
// 			}
// 		}
// 		else {
//         		console.log("Error in network request: " + request_JSON.statusText);
//       		}
// 	})
// 	request_JSON.send(JSON.stringify(payload));
// }

// var submitButtonJSON=document.getElementById("submit_JSON")
// submitButtonJSON.addEventListener("click", sendJSON)