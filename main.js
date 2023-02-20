const APP_ID = 'e4cb17575114776768b8c57ad8ccc924';
const DEFAULT_VALUE = '--';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const searchInput = $('.search-input');
const showError = $('.error');
const weatherIcon = $('.weather-icon');
const temperature = $('.numb-1');
const weather = $('.weather');
const cityName = $('.city-name');
const fellsLike = $('.numb-2');
const Humidity = $('.numb-3');

console.log(weatherIcon);
console.log(cityName);


searchInput.addEventListener("keyup", (e) => {
    if(e.key == "Enter" && searchInput.value != "") {
        requestApi(searchInput.value)
    }
})

function requestApi(city){
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}&units=metric`;
    fetch(api)
        .then((res) => res.json())
        .then((result) => weatherDeatails(result)) ;
}

const weatherDeatails = (info) => {
    if(info.cod == "404") {
        showError.innerText = `${searchInput.value} isn't a valid city name`;
    }
    else {
        showError.innerText = "";
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        if(id == 800) {
            weatherIcon.src = "Weather-Icons/clear.svg";    
        } else if(id >= 200 && id <= 232) {
            weatherIcon.src = "Weather-Icons/storm.svg"; 
        } else if(id >= 600 && id <= 622) {
            weatherIcon.src = "Weather-Icons/snow.svg"; 
        } else if(id >= 701 && id <= 781) {
            weatherIcon.src = "Weather-Icons/haze.svg"; 
        } else if(id >= 801 && id <= 804) {
            weatherIcon.src = "Weather-Icons/cloud.svg"; 
        } else if(id >= 300 && id <= 321 || (id >= 500 && id <= 531)) {
            weatherIcon.src = "Weather-Icons/rain.svg"; 
        }


        temperature.innerText = Math.round(temp);
        weather.innerText = description;
        cityName.innerText = `${city}, ${country}`;
        fellsLike.innerText = Math.round(feels_like);
        Humidity.innerText = `${humidity}%`;
        console.log(info);

    }
    
}