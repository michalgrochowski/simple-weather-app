(function(){
    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    const pressure = document.getElementById("pressure");
    const rain = document.getElementById("rain");
    const clouds = document.getElementById("clouds");
    const city = document.getElementById("city");
    const cityInput = document.getElementById("cityInput");
    const cityButton = document.getElementById("cityButton");

    const api = "http://api.openweathermap.org/data/2.5/weather?q=";
    const key = "7c7fe6ea927aa8bfbd07cfce66100663";

    cityButton.addEventListener("click", function() {
        fetch(api + cityInput.value + "&APPID=" + key + "&units=metric")
        .then((resp) => resp.json())
        .then(function(data) {
            temperature.innerHTML = data.main.temp + "&deg; C";
            pressure.innerHTML = data.main.pressure + " hPa";
            humidity.innerHTML = data.main.humidity + " %";
            wind.innerHTML = data.wind.speed + " km/h";
            clouds.innerHTML = data.clouds.all;
            rain.innerHTML = data.rain;
            city.innerHTML = data.name;
            console.log(data);
        })
        .catch(function(error) {
            console.log(error);
        })
    });
})();