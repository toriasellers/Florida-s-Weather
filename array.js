let cities = [
    {name: "Gainesville, FL",
    latitude: 29.651634, 
    longitude: -82.324829 },
   {name: "Jacksonville, FL",
    latitude: 30.332184,
    longitude: -81.655647},
    { name: "Miami, FL",
    latitude: 25.761681,
    longitude: -80.191788},
    {name: "Orlando, FL",
    latitude: 28.538336,
    longitude: -81.379234},
    {name: "St. Augustine, FL",
    latitude: 29.901243,
    longitude: -81.312431},
    { name: "Tallahassee, FL",
    latitude: 30.4382,
    longitude: -84.2806 },
    {name: "Tampa, FL",
    latitude: 27.9517,
    longitude: -82.4588}
    ];


document.addEventListener("DOMContentLoaded", () => {
    const cityDropdown = document.getElementById("cityDropdown");
    const resultsTable = document.getElementById("resultsTable").getElementsByTagName('tbody')[0];
  
    cities.forEach(city => {
      const option = new Option(city.name, `${city.latitude},${city.longitude}`);
      cityDropdown.add(option);
    });
  
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const stationLookupUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
        const stationResponse = await fetch(stationLookupUrl);
        const stationData = await stationResponse.json();
        const forecastUrl = stationData.properties.forecast;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        displayWeather(forecastData.properties.periods);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
  
    const displayWeather = (forecastArray) => {
      resultsTable.innerHTML = "";
      forecastArray.forEach(period => {
        const row = resultsTable.insertRow();
        row.insertCell(0).textContent = period.name;
        row.insertCell(1).textContent = `Temperature: ${period.temperature} ${period.temperatureUnit}, Wind: ${period.windDirection} ${period.windSpeed}`;
        row.insertCell(2).textContent = period.shortForecast;
      });
    };
  
    cityDropdown.addEventListener("change", () => {
      const selectedCityIndex = cityDropdown.selectedIndex;
      if (selectedCityIndex !== 0) {
        const selectedCity = cities[selectedCityIndex - 1];
        fetchWeatherData(selectedCity.latitude, selectedCity.longitude);
      }
    });
  });