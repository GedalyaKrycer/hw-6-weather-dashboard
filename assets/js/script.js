console.log("hello world")

var owKey = "6b0f83d2f817a4a623181896ec6d38d0";
var city = "Las Vegas"

// ————————————————————————————————————————————————————————————————————
// Current Weather
// ————————————————————————————————————————————————————————————————————

var curWeatherQueryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + owKey;

console.log(curWeatherQueryUrl);

$.ajax({
    url: curWeatherQueryUrl,
    method: "GET" 
}).then(function(response){
    console.log(response.name);
}); 

