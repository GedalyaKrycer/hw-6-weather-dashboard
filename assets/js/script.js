// Open Weather API Resources 
var owKey = "6b0f83d2f817a4a623181896ec6d38d0";
var city = "Las Vegas"


// ————————————————————————————————————————————————————————————————————
// Current Weather
// ————————————————————————————————————————————————————————————————————

var curWeatherQueryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + owKey + "&units=imperial";


// Event Listener for Submit Button
$("#citySubmit").on("click", function() {
    //  Runs function to call OW API
    weatherSearch();
});


// Event Listener for Enter Key on Input
$("#citySearch").keypress(function(e) {
    // Checks if the key was Enter
    if(e.which == 13) {
        //  Runs function to call OW API
        weatherSearch();
    }
    // return false; 
});


// Function that sends the AJAX Requests to the OW API
function weatherSearch() {

    // Hide Intro Text
    $("#introTxt").removeClass("display").addClass("is-hidden")

    // Show Results from OW API
    $("#cityInfo").removeClass("is-hidden").addClass("display")


    // Ajax Request for the current day weather
    $.ajax({
        url: curWeatherQueryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.weather[0].icon);

        // Adds the City Name to the html
        $("#cityName").text(response.name);

        // Variable For Current Weather icon
        var curWeatherIcon = response.weather[0].icon;

        // Adds the icon image to the html
        $("#cityWeatherIcon").attr("src", "http://openweathermap.org/img/wn/" + curWeatherIcon + ".png")

        // Variable For Current Weather Description
        var iconDes = response.weather[0].description;

        // Adds icon description to the html
        $("#iconDes").text(iconDes);

        // Adds moment.js Generated Date to the html
        $("#cityDate").text(moment().format("MMM Do YYYY"));

        // Variable For Current Weather Temperature
        var tempValue = Math.floor(response.main.temp);

        // Adds Current Weather Temperature to the html
        $("#tempValue").text(`${tempValue}°F`);

        // Variable For Current Weather Humidity
        var humidValue = Math.floor(response.main.humidity);

        // Adds Current Weather Humidity to the html
        $("#humidValue").text(`${humidValue}%`);

        // Variable For Current Weather Window Speed
        var windSpValue = Math.floor(response.wind.speed);

        // Adds Current Weather humidity to the html
        $("#windSpValue").text(`${windSpValue} MPH`);

        // City Location From API Call
        var latVal = response.coord.lat;
        var lonVal = response.coord.lon;

        // Url for UV Index Ajax Call
        var uvIndexQueryUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latVal + "&lon=" + lonVal + "&appid=" + owKey;

        // Nested UV Index Ajax Call
        $.ajax({
            url: uvIndexQueryUrl,
            method: "GET"
        }).then(function (uv) {

            // Adds UV Index Values to the HTML
            $("#uvInValue").text(uv.value);

            // If the UV Index is under 0-2 Show Green
            if (uv.value < 3) {
                $("#uvInValue").removeClass("uv--favorable uv--moderate uv--high uv--severe").addClass("uv--favorable");

                // If the UV Index is under 3-5 Show Yellow
            } else if (uv.value >= 3 && uv.value <= 5) {
                $("#uvInValue").removeClass("uv--favorable uv--moderate uv--high uv--severe").addClass("uv--moderate");

                // If the UV Index is under 6-7 Show Orange
            } else if (uv.value >= 6 && uv.value <= 7) {
                $("#uvInValue").removeClass("uv--favorable uv--moderate uv--high uv--severe").addClass("uv--high");

                // If the UV Index is over 7 Show Red
            } else {
                $("#uvInValue").removeClass("uv--favorable uv--moderate uv--high uv--severe").addClass("uv--severe");
            }

        });

    });


}

