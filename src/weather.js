import { LocalStorage } from "./local-storage";

console.log('hello world');

/*  Planning Doc
    
    *Internal storage of last loaded location
        Type = Module
        -Local storage save/load functions
    
    *Weather API access
        Type = Module
        -Fetch / Promises / Error handling

    *Events
        -Change locations
        -Scroll through forecast data
        -Switch temperature type

*/

// fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=c631b49ca981e5cf9bdf698a0dcdb0fa', {mode: 'cors'})
//     .then(function(response) {
//         return(response.json());

//     })
//     .then(function(response) {
//         console.log('Country: '+response.city.country);
//         console.log('City: '+response.city.name);

//     })
//     .catch(function(error) {
//         console.log('Error: '+error);

//     })

const GetWeather = async ((city) => {
    if(city == '' || city === null || city === undefined){return;}
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c631b49ca981e5cf9bdf698a0dcdb0fa`; 

});// WANT TO AUTO CALL();