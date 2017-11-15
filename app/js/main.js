(function(){
    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    const pressure = document.getElementById("pressure");
    const rain = document.getElementById("rain");
    const clouds = document.getElementById("rain");
    const cityInput = document.getElementById("cityInput");
    const cityButton = document.getElementById("cityButton");

    const urlCity = "api.openweathermap.org/data/2.5/weather?q=";
    const key = "7c7fe6ea927aa8bfbd07cfce66100663";

    cityButton.addEventListener("click", function() {
        fetch(urlCity + cityInput.value + "&APPID=" + key)
        .then((resp) => resp.json())
        .then(function(data) {
            temperature.innerHTML = data.main.temp;
            console.log(data);
        })
        .catch(function(error) {
            console.log(error);
        });
    });
})();