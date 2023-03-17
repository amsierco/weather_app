import { LocalStorage } from "./local-storage";

/*Add date formating*/
/*Forecast is not days, it includes hours in the days*/

// Load weather in local stroge on page load
window.addEventListener('load', () => {
    // Default weather
    if(LocalStorage.retrieve('city') == undefined){
        getWeather('New York', 'imperial');
    } else {
        getWeather(LocalStorage.retrieve('city'), LocalStorage.retrieve('unit'));
    }
});

// Retrieve DOM elements
const getDom = (() => {
    let searchbar = document.querySelector('.searchbar form');
    let unitButton = document.querySelector('#units');
    let location = document.querySelector('#location');
    let feelLike = document.querySelector('#feel-like-temperature');
    let temp = document.querySelector('#temperature');
    let humidity = document.querySelector('#humidity');
    let wind = document.querySelector('#wind');
    let forecast = document.querySelector('.forecast > ul');

    return {
        searchbar,
        unitButton,
        location,
        feelLike,
        temp,
        humidity,
        wind,
        forecast
    }
})();

// Update DOM values with local weather data
const displayLocalWeather = (weather, unit) => {
    let windUnit = 'mph'
    if(unit == 'imperial'){unit='F';}
    else if(unit == 'metric'){unit='C'; windUnit='kmph';}

    getDom.location.textContent = `${weather.name}`;//, ${weather.sys.country}`;
    getDom.feelLike.textContent = `Feels like ${weather.main.feels_like} ${'\u00B0'}${unit}`;
    getDom.temp.textContent = `Temp ${weather.main.temp} ${'\u00B0'}${unit}`;
    getDom.humidity.textContent = `Humidity ${weather.main.humidity}%`;
    getDom.wind.textContent = `Wind ${weather.wind.speed} ${windUnit}`;
}

// Update DOM values with forecast weather data
const displayForecast = (forecast, unit, numDays=40) => {
    let windUnit = 'mph';
    if(unit == 'imperial'){unit='F';}
    else if(unit == 'metric'){unit='C'; windUnit='kmph';}
    
    for(let i=0; i<numDays; i++){
        let currentDay = forecast.list[i];
        let card = document.createElement('li');
        card.setAttribute('id', `${i}`);

        let weather = document.createElement('div');
        let weatherText = document.createElement('div');
        let weatherIcon = document.createElement('img');
        let feelTemp = document.createElement('div');
        let temp = document.createElement('div');
        let humidity = document.createElement('div');
        let wind = document.createElement('div');

        feelTemp.textContent = `Feels like ${currentDay.main.feels_like} ${'\u00B0'}${unit}`;
        temp.textContent = `Temp ${currentDay.main.temp} ${'\u00B0'}${unit}`;
        humidity.textContent = `Humidity ${currentDay.main.humidity}%`;
        wind.textContent = `Wind ${currentDay.wind.speed} ${windUnit}`;
        weatherText.textContent = currentDay.weather[0].description;

        let icon = 'http://openweathermap.org/img/w/'
            + currentDay.weather[0].icon + '.png';
        weatherIcon.setAttribute('src', icon);

        weather.append(weatherIcon, weatherText);
        card.append(
            weather,
            temp,
            feelTemp,
            humidity,
            wind
        );
        getDom.forecast.appendChild(card);

    }
}

// Get weather data from API
// https://openweathermap.org/current#one [OpenWeather API Guide]
const getWeather = async (city, unit='imperial') => {
    try{
        // Search API based on city to get lat & lon
        if(city == '' || city === null || city === undefined){return;}
        let urlOne = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=c631b49ca981e5cf9bdf698a0dcdb0fa`; 
        let forecastResponse = await fetch(urlOne, {mode: 'cors'});
        forecastResponse = await forecastResponse.json();

        console.log(forecastResponse);

        // Update internal storage
        LocalStorage.update('city', city);
        LocalStorage.update('unit', unit);
        
        // Search API based on previous city's lat & lon values
        let lat = forecastResponse.city.coord.lat;
        let lon = forecastResponse.city.coord.lon;

        let urlTwo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=c631b49ca981e5cf9bdf698a0dcdb0fa`;
        let localResponse = await fetch(urlTwo, {mode: 'cors'});
        localResponse = await localResponse.json();

        //console.log(localResponse);

        // Display new weather data
        displayLocalWeather(localResponse, unit);
        getDom.forecast.replaceChildren();
        displayForecast(forecastResponse, unit);

    } catch (error) {
        console.log(error);
        alert('Invalid location! Please try again.');
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

// Unit change
getDom.unitButton.addEventListener('click', () => {
    if(LocalStorage.retrieve('unit') == 'imperial'){
        getWeather(LocalStorage.retrieve('city'), 'metric');
        return;
    }
    getWeather(LocalStorage.retrieve('city'), 'imperial');
})