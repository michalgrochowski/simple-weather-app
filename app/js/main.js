(function(){
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('js/service-worker.js')
        .then(function(registration) {
            console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function(error) {
            console.log('Service worker registration failed, error:', error);
        });
    }
    // Buttons, text input and content boxes
    const TEMPERATURE = document.getElementById("temperature");
    const HUMIDITY = document.getElementById("humidity");
    const WIND = document.getElementById("wind");
    const PRESSURE = document.getElementById("pressure");
    const WIND_DIR = document.getElementById("windDir");
    const CLOUDS = document.getElementById("clouds");
    const RAIN = document.getElementById("rain");
    const CITY = document.getElementById("city");
    const TEMP_MIN = document.getElementById("tempMin");
    const TEMP_MAX = document.getElementById("tempMax");
    const CITY_INPUT = document.getElementById("cityInput");
    const CITY_BUTTON = document.getElementById("cityButton");
    const LOCATE = document.getElementById("locate");
    const MAIN_ICON = document.getElementById("mainIcon");
    const WI_CLASS = new RegExp(/\bwi-.+\b/);
    // API link and key
    const API = "https://api.openweathermap.org/data/2.5/weather?";
    const KEY = "7c7fe6ea927aa8bfbd07cfce66100663";
    // Function that displays current weather based on user provided localisation
    function getWeatherData(data) {
        let date = new Date();
        let currentTime = date.getHours();
        if (currentTime >= 6 && currentTime <= 18 && data.clouds.all < "25") {;
            MAIN_ICON.classList.add("wi-day-sunny");
        } else if (currentTime >= 18 && currentTime <= 6 && data.clouds.all < "25") {
            MAIN_ICON.classList.add("wi-night-clear");
        } else if (currentTime >= 6 && currentTime <= 18 && data.clouds.all >= "25" && data.clouds.all < "50") {
            MAIN_ICON.classList.add("wi-day-cloudy");
        } else if (currentTime >= 18 && currentTime <= 6 && data.clouds.all >= "25" && data.clouds.all < "50") {
            MAIN_ICON.classList.add("wi-night-alt-cloudy");
        } else if (currentTime >= 6 && currentTime <= 18 && data.clouds.all >= "50" && data.clouds.all < "75") {
            MAIN_ICON.classList.add("wi-day-cloudy-high");
        } else if (currentTime >= 18 && currentTime <= 6 && data.clouds.all >= "50" && data.clouds.all < "75") {
            MAIN_ICON.classList.add("wi-night-alt-cloudy-high");
        } else if (data.clouds.all >= "75") {
            MAIN_ICON.classList.add("wi-cloudy");
        }
        TEMPERATURE.textContent = data.main.temp;
        TEMP_MIN.textContent = data.main.temp_min;
        TEMP_MAX.textContent = data.main.temp_max;
        PRESSURE.textContent = data.main.pressure + " hPa";
        HUMIDITY.textContent = data.main.humidity + " %";
        WIND.textContent = data.wind.speed + " m/s";
        CLOUDS.textContent = data.clouds.all + " %";
        WIND_DIR.textContent = data.wind.deg;
        CITY.textContent = data.name;
        if (data.rain !== undefined) {
            RAIN.textContent = data.rain + " %";
        } else {
            RAIN.textContent = "b/d";
        }
    }
    // getWeatherData on click
    CITY_BUTTON.addEventListener("click", function() {
        if (MAIN_ICON.className.match(WI_CLASS)) {
            MAIN_ICON.className = MAIN_ICON.className.replace(WI_CLASS, '')
        }
        fetch(API + "q=" + CITY_INPUT.value + "&APPID=" + KEY + "&units=metric")
        .then((resp) => resp.json())
        .then((data) => {
            getWeatherData(data);
        })
        .catch(function(error) {
            console.log(error);
        })
    });
    // getWeatherData on geolocation
    locate.addEventListener("click", function() {
        if (MAIN_ICON.className.match(WI_CLASS)) {
            MAIN_ICON.className = MAIN_ICON.className.replace(WI_CLASS, '')
        }
        navigator.geolocation.getCurrentPosition(function(position) {
            fetch(API + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + KEY + "&units=metric")
            .then((resp) => resp.json())
            .then((data) => {
                getWeatherData(data);
            })
            .catch(function(error) {
                console.log(error);
            })
        });
    });
})();