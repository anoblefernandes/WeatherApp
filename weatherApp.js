// DOM elements to identify
// Set queryURL to call using your API call.  There are two specific calls: Current Weather & 5-day Forecast
// Begin building an object to contain our API call's query parameters
// Set the API key

// var queryParams = { "api-key": "297c41d059980fa1cfd21f531b3f35a2" };
// Current Weather
// var queryURL = "api.openweathermap.org/data/2.5/weather?q={city name}&appid={297c41d059980fa1cfd21f531b3f35a2}"
// 5 Day Forecast
// var queryURL = "api.openweathermap.org/data/2.5/forecast?q={city name}&appid={297c41d059980fa1cfd21f531b3f35a2}"
// UV 
// var queryURL = "api.openweathermap.org/data/2.5/forecast?q={city name}&appid={297c41d059980fa1cfd21f531b3f35a2}"

// Grab text the user typed into the search input, add to the queryParams object
// queryParams.q = $("#search-term")
//     .val()
//     .trim();
// Next make the ajax call to request weather data

// Set function to convert Kelvin to Fahrenheit
function kelvin_fahrenheit(K){
    return (K - 273.15) * 9.0/5 + 32
 }

// Run function to take search term and call API based on cityName
$("#run-search").on("click", function (event) {
    event.preventDefault()
    var cityName = document.getElementById("search-term").value;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=297c41d059980fa1cfd21f531b3f35a2"
    var queryUVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=297c41d059980fa1cfd21f531b3f35a2&lat={lat}&lon={lon}"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $("#weather-section").append("<p> Temp: "+kelvin_fahrenheit(response.main.temp) + "</p>")
        $("#weather-section").append("<p> Humidity: "+response.main.humidity + "%" + "</p>")
        $("#weather-section").append("<p> Wind: "+response.wind.speed + "MPH" + "</p>")
    })
})
$("#run-search").on("click", function (event) {
    event.preventDefault()
    var cityName = document.getElementById("search-term").value;
    var queryForecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=297c41d059980fa1cfd21f531b3f35a2"

    $.ajax({
        url: queryForecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $("#forecast-section").append("<p> Tomorrow: "+ kelvin_fahrenheit(response.list[0].main.temp) + "</p>") 
        $("#forecast-section").append("<p> Next Day: "+ kelvin_fahrenheit(response.list[1].main.temp) + "</p>")
        $("#forecast-section").append("<p> Next Day: "+ kelvin_fahrenheit(response.list[2].main.temp) + "</p>")
        $("#forecast-section").append("<p> Next Day: "+ kelvin_fahrenheit(response.list[3].main.temp) + "</p>")
        $("#forecast-section").append("<p> Next Day: "+ kelvin_fahrenheit(response.list[4].main.temp) + "</p>")
    })
})

// .on("click"), function associated with the clear button
$("#clear-all").on("click", clear);
