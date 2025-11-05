import { base } from "./constants.js";

const currentTemperatureElement = document.getElementById("current-temp");

let latitude = 38.9161;
let longitude = -6.3437;

let queryParameters = `?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=Europe%2FBerlin&forecast_days=1`;

function render(data){
  currentTemperatureElement.innerText = data.current.temperature_2m + "°";
}

async function fetchWeather(){
  let response  = await fetch(base + queryParameters);
  let data = await response.json();
  render(data)
}

navigator.geolocation.getCurrentPosition(
  (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    queryParameters = `?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=Europe%2FBerlin&forecast_days=1`;
    fetchWeather();
  }
);


