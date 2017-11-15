(function(){
    // Buttons, text input and content boxes
    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    const pressure = document.getElementById("pressure");
    const windDir = document.getElementById("windDir");
    const clouds = document.getElementById("clouds");
    const city = document.getElementById("city");
    const cityInput = document.getElementById("cityInput");
    const cityButton = document.getElementById("cityButton");
    const locate = document.getElementById("locate");
    // API link and key
    const api = "https://api.openweathermap.org/data/2.5/weather?";
    const key = "7c7fe6ea927aa8bfbd07cfce66100663";
    // Function that displays current weather based on user provided localisation
    cityButton.addEventListener("click", function() {
        fetch(api + "q=" + cityInput.value + "&APPID=" + key + "&units=metric")
        .then((resp) => resp.json())
        .then((data) => {
            temperature.innerHTML = data.main.temp + "&deg; C";
            pressure.textContent = data.main.pressure + " hPa";
            humidity.textContent = data.main.humidity + " %";
            wind.textContent = data.wind.speed + " m/h";
            clouds.textContent = data.clouds.all + " %";
            windDir.textContent = data.wind.deg;
            city.textContent = data.name;
        })
        .catch(function(error) {
            console.log(error);
        })
    });
    // Function that displays current weather based on user geolocation
    locate.addEventListener("click", function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            fetch(api + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + key + "&units=metric")
            .then((resp) => resp.json())
            .then((data) => {
                temperature.innerHTML = data.main.temp + "&deg; C";
                pressure.textContent = data.main.pressure + " hPa";
                humidity.textContent = data.main.humidity + " %";
                wind.textContent = data.wind.speed + " m/h";
                clouds.textContent = data.clouds.all + " %";
                windDir.textContent = data.wind.deg;
                city.textContent = data.name;
            })
            .catch(function(error) {
                console.log(error);
            })
        });
    });
})();