import { base } from "./constants.js";

const currentTemperatureElement = document.getElementById("current-temp");
const cardContainer = document.querySelector(".forecast-container");

let latitude = 38.9161;
let longitude = -6.3437;
let queryParameters;

function render(data, index){
  currentTemperatureElement.innerText = data.current.temperature_2m + "°";

  let arrayTime = data.hourly.time;
  let arrayTemperature = data.hourly.temperature_2m;
  let arrayWeatherCode = data.hourly.weather_code;
  const maxDays = 6;

  let cardElement;
  for(let i = index; i < index + maxDays; i++){
    let weatherCode = arrayWeatherCode[i];
    let icon;
    switch (weatherCode) {
      case 0:
        icon = "Sunny.svg";
        break;
      case 1:
      case 2:
      case 3:
        icon = "PartlyCloudy.svg";
        break;
      case 61:
      case 63:
      case 65:
        icon = "Rainy.svg";
        break;

      default:
        icon = "Sunny.svg";
        break;
    }

    cardElement =
      `<div class="forecast-card">
        <p class="time">${arrayTime[i].split("T")[1]}</p>
        <img src="icons/${icon}" alt="icon">
        <p class="temp">${arrayTemperature[i]}°C</p>
      </div>`;

    cardContainer.innerHTML += cardElement;
  }

}

function processData(data){
  console.log(data);

  let currentTime = data.current.time.split(":")[0] + ":00";
  let arrayTime = data.hourly.time;
  let index = arrayTime.findIndex((element) => element == currentTime);

  render(data, index);
}

async function fetchWeather(){
  let response  = await fetch(base + queryParameters);
  let data = await response.json();
  processData(data);
}

navigator.geolocation.getCurrentPosition(
  (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    queryParameters = `?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code&timezone=Europe%2FBerlin&forecast_days=3`;
    fetchWeather();
  }
);


