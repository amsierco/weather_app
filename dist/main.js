(()=>{"use strict";var e={423:(e,t,r)=>{r.d(t,{m:()=>i});const i={update:function(e,t){localStorage.setItem(`${e}`,JSON.stringify(t))},retrieve:function(e){if("undefined"!=localStorage.getItem(`${e}`))return JSON.parse(localStorage.getItem(`${e}`))}}},891:(e,t,r)=>{var i=r(423);window.addEventListener("load",(()=>{null==i.m.retrieve("city")?a("New York","imperial"):a(i.m.retrieve("city"),i.m.retrieve("unit"))}));const n={searchbar:document.querySelector(".searchbar form"),unitButton:document.querySelector("#units"),location:document.querySelector("#location"),feelLike:document.querySelector("#feel-like-temperature"),temp:document.querySelector("#temperature"),humidity:document.querySelector("#humidity"),wind:document.querySelector("#wind"),forecast:document.querySelector(".forecast > ul")},a=async(e,t="imperial")=>{try{if(""==e||null==e)return;let r=`https://api.openweathermap.org/data/2.5/onecall?q=${e}&units=${t}&appid=c631b49ca981e5cf9bdf698a0dcdb0fa`,a=await fetch(r,{mode:"cors"});a=await a.json(),console.log(a),i.m.update("city",e),i.m.update("unit",t);let o=`https://api.openweathermap.org/data/2.5/onecall?lat=${a.city.coord.lat}&lon=${a.city.coord.lon}&units=${t}&appid=c631b49ca981e5cf9bdf698a0dcdb0fa`,c=await fetch(o,{mode:"cors"});c=await c.json(),((e,t)=>{let r="mph";"imperial"==t?t="F":"metric"==t&&(t="C",r="kmph"),n.location.textContent=`${e.name}`,n.feelLike.textContent=`Feels like ${e.main.feels_like} °${t}`,n.temp.textContent=`Temp ${e.main.temp} °${t}`,n.humidity.textContent=`Humidity ${e.main.humidity}%`,n.wind.textContent=`Wind ${e.wind.speed} ${r}`})(c,t),n.forecast.replaceChildren(),((e,t,r=40)=>{let i="mph";"imperial"==t?t="F":"metric"==t&&(t="C",i="kmph");for(let a=0;a<r;a++){let r=e.list[a],o=document.createElement("li");o.setAttribute("id",`${a}`);let c=document.createElement("div"),l=document.createElement("div"),m=document.createElement("img"),d=document.createElement("div"),u=document.createElement("div"),p=document.createElement("div"),s=document.createElement("div");d.textContent=`Feels like ${r.main.feels_like} °${t}`,u.textContent=`Temp ${r.main.temp} °${t}`,p.textContent=`Humidity ${r.main.humidity}%`,s.textContent=`Wind ${r.wind.speed} ${i}`,l.textContent=r.weather[0].description;let f="https://openweathermap.org/img/w/"+r.weather[0].icon+".png";m.setAttribute("src",f),c.append(m,l),o.append(c,u,d,p,s),n.forecast.appendChild(o)}})(a,t)}catch(e){return console.log(e),void alert("Invalid location! Please try again.")}};n.searchbar.addEventListener("submit",(e=>{e.preventDefault();let t=n.searchbar.elements[0].value;console.log("Searching for: "+t),a(t),n.searchbar.reset()})),n.unitButton.addEventListener("click",(()=>{"imperial"!=i.m.retrieve("unit")?a(i.m.retrieve("city"),"imperial"):a(i.m.retrieve("city"),"metric")}))}},t={};function r(i){var n=t[i];if(void 0!==n)return n.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,r),a.exports}r.d=(e,t)=>{for(var i in t)r.o(t,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r(891),r(423)})();
