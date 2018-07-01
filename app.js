(function() {
var app = document.querySelector('#app');
var cityForm = app.querySelector('.city-form');
var cityInput = cityForm.querySelector('.city-input');
//var getWeatherButton = cityForm.querySelector('.get-weather-button')
var cityWeather = app.querySelector('.city-weather');

var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
var DARKSKY_API_KEY = 'cdb39891cd1015396eb1e87b1e3a228a';
var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

var GOOGLE_MAPS_API_KEY = 'AIzaSyCVkKVnAdskF8rxpQrrfQelVYdfdzGVmmU';
var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

function getCoordinatesForCity(cityName) {
    var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;
    return (
        fetch(url)
        .then(response => response.json())
        .then(data => data.results[0].geometry.location)
    );
    }

function getCurrentWeather(coords) {
    var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=si&exclude=minutely,hourly,daily,flags`;
      
    return (
        fetch(url)
        .then(response => response.json())
        .then(data => data.currently)
    );
    }

   cityForm.addEventListener('submit', function(event) {    
    event.preventDefault();
    cityWeather.innerText= "Fetching data..."
    console.log("button clicked");

    var city = cityInput.value;

    getCoordinatesForCity(city)
        .then(getCurrentWeather)
        .then(function(weather) {     
        var calculation = Math.round(weather.temperature * (9/5) + 32);
        cityWeather.innerText=
        "Current forecast for " + city + '\n' + '☁️' + '\n' + 'SUMMARY: ' + weather.summary + '\n' + 'TEMPERATURE: around ' + calculation + ' ºF or ' + Math.round(weather.temperature) + " ºC" + '\n' + 'CHANCE OF PRECIPITATION: ' + (weather.precipProbability * 100) + '%' + '\n' + 'HUMIDITY: ' + (weather.humidity * 100) +'%' + '\n' + 'UV INDEX: ' + weather.uvIndex + '\n' + 'CLOUD COVER: ' + (weather.cloudCover * 100) + '%'
        })
        });
    })();
    

  

    
    
