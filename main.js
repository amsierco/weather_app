(()=>{"use strict";var e={423:(e,t,r)=>{r.d(t,{m:()=>i});const i={update:function(e,t){localStorage.setItem(`${e}`,JSON.stringify(t))},retrieve:function(e){if("undefined"!=localStorage.getItem(`${e}`))return JSON.parse(localStorage.getItem(`${e}`))}}},891:(e,t,r)=>{var i=r(423);window.addEventListener("load",(()=>{null==i.m.retrieve("city")?a("New York","imperial"):a(i.m.retrieve("city"),i.m.retrieve("unit"))}));const o={searchbar:document.querySelector(".searchbar form"),unitButton:document.querySelector("#units"),location:document.querySelector("#location"),feelLike:document.querySelector("#feel-like-temperature"),temp:document.querySelector("#temperature"),humidity:document.querySelector("#humidity"),wind:document.querySelector("#wind"),forecast:document.querySelector(".forecast > ul")},a=async(e,t="imperial")=>{try{if(""==e||null==e)return;let r=`http://api.openweathermap.org/data/2.5/forecast?q=${e}&units=${t}&appid=c631b49ca981e5cf9bdf698a0dcdb0fa`,a=await fetch(r,{mode:"cors"});a=await a.json(),console.log(a),i.m.update("city",e),i.m.update("unit",t);let n=`https://api.openweathermap.org/data/2.5/weather?lat=${a.city.coord.lat}&lon=${a.city.coord.lon}&units=${t}&appid=c631b49ca981e5cf9bdf698a0dcdb0fa`,c=await fetch(n,{mode:"cors"});c=await c.json(),((e,t)=>{let r="mph";"imperial"==t?t="F":"metric"==t&&(t="C",r="kmph"),o.location.textContent=`${e.name}, ${e.sys.country}`,o.feelLike.textContent=`Feels like ${e.main.feels_like} °${t}`,o.temp.textContent=`Temp ${e.main.temp} °${t}`,o.humidity.textContent=`Humidity ${e.main.humidity}%`,o.wind.textContent=`Wind ${e.wind.speed} ${r}`})(c,t),((e,t,r=14)=>{let i="mph";"imperial"==t?t="F":"metric"==t&&(t="C");for(let e=0;e<r;e++)document.createElement("div").setAttribute("id",`${e}`)})(0,t)}catch(e){return console.log(e),void alert("Invalid location! Please try again.")}};o.searchbar.addEventListener("submit",(e=>{e.preventDefault();let t=o.searchbar.elements[0].value;console.log("Searching for: "+t),a(t),o.searchbar.reset()})),o.unitButton.addEventListener("click",(()=>{"imperial"!=i.m.retrieve("unit")?a(i.m.retrieve("city"),"imperial"):a(i.m.retrieve("city"),"metric")}))}},t={};function r(i){var o=t[i];if(void 0!==o)return o.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,r),a.exports}r.d=(e,t)=>{for(var i in t)r.o(t,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r(891),r(423)})();