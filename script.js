//-- my OpenWeather API key -- 
const apiKey = '7bbcb7dee64e780bde196bd58c399191';

// pressing "Enter" will also serve as get weather button
document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    document.getElementById('weatherResult').innerHTML = '<div class="loader"></div>'; // Show loading spinner

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById('weatherResult').innerHTML = `<p>City not found.</p>`;
            return;
        }

        const weatherCondition = data.weather[0].main.toLowerCase();
        changeBackground(weatherCondition);

        document.getElementById('weatherResult').innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>${data.weather[0].description}</p>
            <h3>${data.main.temp}°C</h3>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('weatherResult').innerHTML = `<p>Something went wrong. Try again later.</p>`;
    }
}

// -- changing the background based on the weather
function changeBackground(weather) {
    let gradient = "";

    if (weather.includes("clear")) {
        gradient = "linear-gradient(to right, #ff9a9e, #fad0c4)";
    } else if (weather.includes("clouds")) {
        gradient = "linear-gradient(to right, #bdc3c7, #2c3e50)";
    } else if (weather.includes("rain")) {
        gradient = "linear-gradient(to right, #4b79a1, #283e51)";
    } else if (weather.includes("snow")) {
        gradient = "linear-gradient(to right, #eef2f3, #8e9eab)";
    } else if (weather.includes("mist") || weather.includes("fog") || weather.includes("haze")) {
        gradient = "linear-gradient(to right, #636FA4, #E8CBC0)";
    } else {
        gradient = "linear-gradient(to right, #4facfe, #00f2fe)"; // this is our default
    }

    document.body.style.background = gradient;
}
