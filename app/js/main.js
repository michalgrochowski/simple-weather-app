(function(){
    // Buttons, text input and content boxes
    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    const pressure = document.getElementById("pressure");
    const windDir = document.getElementById("windDir");
    const clouds = document.getElementById("clouds");
    const rain = document.getElementById("rain");
    const city = document.getElementById("city");
    const tempMin = document.getElementById("tempMin");
    const tempMax = document.getElementById("tempMax");
    const cityInput = document.getElementById("cityInput");
    const cityButton = document.getElementById("cityButton");
    const locate = document.getElementById("locate");
    const mainIcon = document.getElementById("mainIcon");
    const wiClass = new RegExp(/\bwi-.+\b/);
    // API link and key
    const api = "https://api.openweathermap.org/data/2.5/weather?";
    const key = "7c7fe6ea927aa8bfbd07cfce66100663";
    // Function that displays current weather based on user provided localisation
    cityButton.addEventListener("click", function() {
        if (mainIcon.className.match(wiClass)) {
            mainIcon.className = mainIcon.className.replace(wiClass, '')
        } else {
            return;
        }
        fetch(api + "q=" + cityInput.value + "&APPID=" + key + "&units=metric")
        .then((resp) => resp.json())
        .then((data) => {
            let date = new Date();
            let currentTime = date.getHours();
            if (currentTime >= 6 && currentTime <= 18 && data.clouds.all < "25") {;
                mainIcon.classList.add("wi-day-sunny");
            } else if (currentTime >= 18 && currentTime <= 6 && data.clouds.all < "25") {
                mainIcon.classList.add("wi-night-clear");
            } else if (currentTime >= 6 && currentTime <= 18 && data.clouds.all >= "25" && data.clouds.all < "50") {
                mainIcon.classList.add("wi-day-cloudy");
            } else if (currentTime >= 18 && currentTime <= 6 && data.clouds.all >= "25" && data.clouds.all < "50") {
                mainIcon.classList.add("wi-night-alt-cloudy");
            } else if (currentTime >= 6 && currentTime <= 18 && data.clouds.all >= "50" && data.clouds.all < "75") {
                mainIcon.classList.add("wi-day-cloudy-high");
            } else if (currentTime >= 18 && currentTime <= 6 && data.clouds.all >= "50" && data.clouds.all < "75") {
                mainIcon.classList.add("wi-night-alt-cloudy-high");
            } else if (data.clouds.all >= "75") {
                mainIcon.classList.add("wi-cloudy");
            }
            temperature.innerHTML = data.main.temp;
            tempMin.textContent = data.main.temp_min;
            tempMax.textContent = data.main.temp_max;
            pressure.textContent = data.main.pressure + " hPa";
            humidity.textContent = data.main.humidity + " %";
            wind.textContent = data.wind.speed + " m/s";
            clouds.textContent = data.clouds.all + " %";
            windDir.textContent = data.wind.deg;
            city.textContent = data.name;
            if (data.rain !== undefined) {
                rain.textContent = data.rain + " %";
            } else {
                rain.textContent = "b/d";
            }
        })
        .catch(function(error) {
            console.log(error);
        })
    });
    // Function that displays current weather based on user geolocation
    locate.addEventListener("click", function() {
        if (mainIcon.className.match(wiClass)) {
            mainIcon.className = mainIcon.className.replace(wiClass, '')
        } else {
            return;
        }
        navigator.geolocation.getCurrentPosition(function(position) {
            fetch(api + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + key + "&units=metric")
            .then((resp) => resp.json())
            .then((data) => {
                let date = new Date();
                let currentTime = date.getHours();
                if (currentTime >= 6 && currentTime <= 18 && data.clouds.all < "25") {;
                    mainIcon.classList.add("wi-day-sunny");
                } else if (currentTime >= 18 && currentTime <= 6 && data.clouds.all < "25") {
                    mainIcon.classList.add("wi-night-clear");
                } else if (currentTime >= 6 && currentTime <= 18 && data.clouds.all >= "25" && data.clouds.all < "50") {
                    mainIcon.classList.add("wi-day-cloudy");
                } else if (currentTime >= 18 && currentTime <= 6 && data.clouds.all >= "25" && data.clouds.all < "50") {
                    mainIcon.classList.add("wi-night-alt-cloudy");
                } else if (currentTime >= 6 && currentTime <= 18 && data.clouds.all >= "50" && data.clouds.all < "75") {
                    mainIcon.classList.add("wi-day-cloudy-high");
                } else if (currentTime >= 18 && currentTime <= 6 && data.clouds.all >= "50" && data.clouds.all < "75") {
                    mainIcon.classList.add("wi-night-alt-cloudy-high");
                } else if (data.clouds.all >= "75") {
                    mainIcon.classList.add("wi-cloudy");
                }
                temperature.innerHTML = data.main.temp;
                tempMin.innerHTML = data.main.temp_min + " &deg; C";
                tempMax.innerHTML = data.main.temp_max + " &deg; C";
                pressure.textContent = data.main.pressure + " hPa";
                humidity.textContent = data.main.humidity + " %";
                wind.textContent = data.wind.speed + " m/s";
                clouds.textContent = data.clouds.all + " %";
                windDir.textContent = data.wind.deg;
                city.textContent = data.name;
                if (data.rain !== undefined) {
                    rain.textContent = data.rain + " %";
                } else {
                    rain.textContent = "b/d";
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        });
    });
})();