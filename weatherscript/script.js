document.getElementById('locationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const location = document.getElementById('locationInput').value;
    getWeather(location);
});

async function getWeather(location) {
    const url = `https://www.metaweather.com/api/location/search/?query=${location}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        if (data.length === 0) throw new Error('City not found');

        const city = data[0];
        const weatherUrl = `https://www.metaweather.com/api/location/${city.woeid}/`;

        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) throw new Error('Weather data not found');

        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const todayWeather = data.consolidated_weather[0];
    document.getElementById('cityName').textContent = data.title;
    document.getElementById('temperature').textContent = `Temperature: ${todayWeather.the_temp.toFixed(1)}°C`;
    document.getElementById('weatherDescription').textContent = `Weather: ${todayWeather.weather_state_name}`;
}