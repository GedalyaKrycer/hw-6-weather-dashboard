// Open Weather API Resources 
const owKey = "6b0f83d2f817a4a623181896ec6d38d0";


// Unix Time Converter Modified From Stack Overflow
function timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const time = month + ' / ' + date + ' / ' + year;
    return time;
};
 
const savedLocations = [];

// ————————————————————————————————————————————————————————————————————
// Current Weather
// ————————————————————————————————————————————————————————————————————

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
});


// Function that sends the AJAX Requests to the OW API
function weatherSearch() {

    // Captures user's entry into the city variable
    const city = $("#citySearch").val().trim();

    // Save values to an array
    savedLocations.push(city);

    // Stores it locally
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));

    // Saves the location on the screen and in local storage
    saveLocation(city);

    // Clears the value in the input
    $("#citySearch").val("");

    // Clears Last Results
    $("#foreContent").empty();

    // Hide Intro Text
    $("#introTxt").removeClass("display").addClass("is-hidden")

    // Show Results from OW API
    $("#cityInfo").removeClass("is-hidden").addClass("display")
    $("#foreSection").removeClass("is-hidden").addClass("display")

    

    // API URL Build for the main weather display
    const curWeatherQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + owKey + "&units=imperial";

    // Ajax Request for the current day weather
    $.ajax({
        url: curWeatherQueryUrl,
        method: "GET"
    }).then(function (response) {

        // Adds the City Name to the html
        $("#cityName").text(response.name);

        // Variable For Current Weather icon
        const curWeatherIcon = response.weather[0].icon;

        // Adds the icon image to the html
        $("#cityWeatherIcon").attr("src", "https://openweathermap.org/img/wn/" + curWeatherIcon + ".png")

        // Variable For Current Weather Description
        const iconDes = response.weather[0].description;

        // Adds icon description to the html
        $("#iconDes").text(iconDes);

        // Adds the current Date to the html
        $("#cityDate").text(timeConverter(response.dt));

        // Variable For Current Weather Temperature
        const tempValue = Math.floor(response.main.temp);

        // Adds Current Weather Temperature to the html
        $("#tempValue").text(`${tempValue}°F`);

        // Variable For Current Weather Humidity
        const humidValue = Math.floor(response.main.humidity);

        // Adds Current Weather Humidity to the html
        $("#humidValue").text(`${humidValue}%`);

        // Variable For Current Weather Window Speed
        const windSpValue = Math.floor(response.wind.speed);

        // Adds Current Weather humidity to the html
        $("#windSpValue").text(`${windSpValue} MPH`);

        // City Location From API Call
        const latVal = response.coord.lat;
        const lonVal = response.coord.lon;

        // Url for UV i Ajax Call
        const uviQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latVal + "&lon=" + lonVal + "&appid=" + owKey;

        // Nested UV i Ajax Call
        $.ajax({
            url: uviQueryUrl,
            method: "GET"
        }).then(function (uv) {

            // Adds UV i Values to the HTML
            $("#uvInValue").text(uv.value);

            // If the UV i is under 0-2 Show Green
            if (uv.value < 3) {
                $("#uvInValue").removeClass("uv--favorable uv--moderate uv--high uv--severe").addClass("uv--favorable");

                // If the UV i is under 3-5 Show Yellow
            } else if (uv.value >= 3 && uv.value <= 5) {
                $("#uvInValue").removeClass("uv--favorable uv--moderate uv--high uv--severe").addClass("uv--moderate");

                // If the UV i is under 6-7 Show Orange
            } else if (uv.value >= 6 && uv.value <= 7) {
                $("#uvInValue").removeClass("uv--favorable uv--moderate uv--high uv--severe").addClass("uv--high");

                // If the UV i is over 7 Show Red
            } else {
                $("#uvInValue").removeClass("uv--favorable uv--moderate uv--high uv--severe").addClass("uv--severe");
            }
        });
    });


    // Query URL for 5 Day Forecast
    const forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + owKey + "&units=imperial";

    $.ajax({
        url: forecastQueryUrl,
        method: "GET"
    }).then(function(forecast) {
        
        // This stores the array of 40 weather markers
        const fList = forecast.list;

        // This custom array selects one from each day
        const forecastArr = [fList[5], fList[13], fList[21], fList[29], fList[36]];

        // For Loop stores the API Data and builds it on the HTML Page
        for (let i = 0; i < forecastArr.length; i++) {

            // Variables that store the API Data
            const foreDate = forecast.list[i].dt;
            const foreIcon = forecast.list[i].weather[0].icon;
            const foreDesc = forecast.list[i].weather[0].description;
            const foreTemp = forecast.list[i].main.temp;
            const foreHumidity = forecast.list[i].main.humidity;

            // HTML Build for each day
            $("#foreContent").append(`
            <div class="column">
                <div class="box forecast__container">
                    <h3 class="forecast__date">${timeConverter(foreDate)}</h3>
                    <img src="https://openweathermap.org/img/wn/${foreIcon}.png" alt="Weather Status Icon">
                    <p class="forecast__description">${foreDesc}</p>
                    <p class="forecast__value">Temp: ${Math.floor(foreTemp)}°F</p>
                    <p class="forecast__value">Humidity: ${Math.floor(foreHumidity)}%</p>

                </div>
            </div>
            `);
        }
    });
}


function saveLocation(location) {
    // HTML Build Each Location Button
    $("#locationContainer").append(`
        <button class="button locations__btn">
          <i class="fas fa-map-marker-alt locations__icon"></i>
          ${location}
        </button>
    `);
};

// EVENT LISTENER 
$(".locations__btn").click(function() {
    console.log("Hello");

});






