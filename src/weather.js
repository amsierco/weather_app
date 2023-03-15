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
    if(LocalStorage.retrieve('API-response') == null){
        displayWeather('New York');
    } else {
        displayWeather(LocalStorage.retrieve('API-response'));
    }
});

// Retrieve DOM elements
const getDom = (() => {
    let searchbar = document.querySelector('.searchbar form');
    let location = document.querySelector('#location');
    let feelLike = document.querySelector('#feel-like-temperature');
    let temp = document.querySelector('#temperature');
    let humidity = document.querySelector('#humidity');

    return {
        searchbar,
        location,
        feelLike,
        temp,
        humidity
    }
})();

// Update DOM values
const displayWeather = (weather) => {
    getDom.location.textContent = `${weather.name}, ${weather.sys.country}`;
    getDom.feelLike.textContent = weather.main.feels_like;
    getDom.temp.textContent = weather.main.temp;
    getDom.humidity.textContent = weather.main.humidity;
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

        // Search API based on previous city's lat & lon values
        let lat = tempResponse.city.coord.lat;
        let lon = tempResponse.city.coord.lon;

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=c631b49ca981e5cf9bdf698a0dcdb0fa`;
        let response = await fetch(url, {mode: 'cors'});
        response = await response.json();
        
        //console.log(response);

        // Update internal storage
        LocalStorage.update('API-response');

        // Display new weather data
        displayWeather(response);

    } catch (error) {
        console.log(error);
        alert('Invalid coordinates! Please try again.');
        return;
    }
}

// Searchbar
getDom.searchbar.addEventListener('submit', (e) => {
    e.preventDefault();
    let search = getDom.searchbar.elements[0].value;
    console.log('Searching for: '+search);
    getWeather(search);
    getDom.searchbar.reset();
})