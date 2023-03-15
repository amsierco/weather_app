import { LocalStorage } from "./local-storage";

/*  Planning Doc
    
    *Internal storage of last loaded location
        Type = Module
        -Local storage save/load functions
        -Use local storage to update the temp units

    *Weather API access
        Type = Module
        -Fetch / Promises / Error handling

    *Events
        -Change locations
        -Scroll through forecast data
        -Switch temperature type

*/

// Load weather in local stroge on page load
window.addEventListener('load', () => {
    displayWeather(LocalStorage.get('API-response'));
});

const getDom = (() => {
    let country = document.querySelector('#country');
    let city = document.querySelector('#city');
    let feelLike = document.querySelector('#feel-like-temperature');
    let temp = document.querySelector('#temperature');
    let humidity = document.querySelector('#humidity');

    return {
        country,
        city,
        feelLike,
        temp,
        humidity
    }
})();

// Assign weather data to variables
const displayWeather = (weather) => {
    getDom.country.textContent = 'Country= '+weather.sys.country;
    getDom.city.textContent = 'City= '+weather.name;
    getDom.feelLike.textContent = 'Feel like= '+weather.main.feels_like+'%';
    getDom.temp.textContent = 'Temp= '+weather.main.temp+' F';
    getDom.humidity.textContent = 'Humidity= '+weather.main.humidity+' F';
}

// Get weather data from API
// https://openweathermap.org/current#one [OpenWeather API Guide]
const getWeather = async (city) => {
    try{
        // Search API based on city to get lat & lon
        if(city == '' || city === null || city === undefined){return;}
        let tempUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c631b49ca981e5cf9bdf698a0dcdb0fa`; 
        let tempResponse = await fetch(tempUrl, {mode: 'cors'});
        tempResponse = await tempResponse.json();
        let lat = tempResponse.city.coord.lat;
        let lon = tempResponse.city.coord.lon;

        // Search API based on previous city's lat & lon values
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=c631b49ca981e5cf9bdf698a0dcdb0fa`;
        let response = await fetch(url, {mode: 'cors'});
        response = await response.json();
        console.log(response);

        // Update internal storage
        LocalStorage.update('API-response', response);

        // Display new weather data
        displayWeather(response);

    } catch (error) {
        console.log(error);
    }
}
// Temp test call
getWeather('New York');
