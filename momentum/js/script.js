const language = document.getElementsByTagName("html")[0].getAttribute("lang");
const body = document.querySelector('body');

const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
let randomNum = getRandomNum(1, 20);
let timesOfDay = "";

const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');

const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');


function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


// SHOW TIME
showTime();
getSlideNext()
getQuotes()

function showTime() {
    const date = new Date();
    time.textContent = date.toLocaleTimeString();
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
}


// SHOW DATE
function showDate() {
    const date = new Date();
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    data.textContent = date.toLocaleDateString('en-EN', options); // 'ru-RU', 'be-BE'
}


// SHOW GREETING
function showGreeting() {
    const greetingTextEng = [['Good', 'Good', 'Good'], ['morning', 'afternoon', 'evening', ' night']];
    const greetingTextRus = [['Доброе', 'Добрый', 'Доброй'], ['утро', 'день', 'вечер', ' ночи']];
    const greetingTextBel = [['Добрай', 'Добры', 'Дабра'], ['раніцы', 'дзень', 'вечар', 'нач']];

    let greetingText = language === 'en' ? greetingTextEng : language === 'ru' ? greetingTextRus : language === 'be' ? greetingTextBel : null;

    const timeOfDay = getTimeOfDay();
    if (timeOfDay >= 6 && timeOfDay < 12) {
        greeting.textContent = `${greetingText[0][0]} ${greetingText[1][0]}`;
        timesOfDay = greetingTextEng[1][0]
    } else if (timeOfDay >= 12 && timeOfDay < 18) {
        greeting.textContent = `${greetingText[0][1]} ${greetingText[1][1]}`;
        timesOfDay = greetingTextEng[1][1]
    } else if (timeOfDay >= 18 && timeOfDay < 23) {
        greeting.textContent = `${greetingText[0][1]} ${greetingText[1][2]}`;
        timesOfDay = greetingTextEng[1][2]
    } else if (timeOfDay >= 0 && timeOfDay < 6) {
        greeting.textContent = `${greetingText[0][2]} ${greetingText[1][3]}`;
        timesOfDay = greetingTextEng[1][3]
    }
}

function getTimeOfDay() {
    const date = new Date();
    return date.getHours();
}


// SAVE AND READ LOCAL STORAGE
function setLocalStorage() { // Save name, city to LocalStorage
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() { // Load name, city to LocalStorage
    localStorage.getItem('name') ? name.value = localStorage.getItem('name') : '';
}
window.addEventListener('load', getLocalStorage)


// SET BACKGROUND IMAGE
function setBg(timesOfDay, bgNum) {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/Diskantis/momentum-stage1-tasks/assets/images/${timesOfDay}/${bgNum}.jpg`

    // новый упрощенный вариант
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    }
    // вместо этого кода
    // img.addEventListener('load', () {
    //     body.style.backgroundImage = ...
    // })
}


// SLIDER
function getSlidePrev() {
    randomNum < 2 ? randomNum = 20 : randomNum = randomNum - 1;
    let prevNum = randomNum.toString()
    prevNum.length < 2 ? prevNum = prevNum.padStart(2, '0') : null
    setBg(timesOfDay, prevNum)
}
function getSlideNext() {
    randomNum > 20 ? randomNum = 1 : randomNum = randomNum + 1;
    let nextNum = randomNum.toString()
    nextNum.length < 2 ? nextNum = nextNum.padStart(2, '0') : null
    setBg(timesOfDay, nextNum)
}

slidePrev.addEventListener('click', getSlidePrev)
slideNext.addEventListener('click', getSlideNext)


// SHOW WEATHER
// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=ba33b9986c51c571df0fa31815ded896&units=metric
// // Минск - название города, можно указывать на русском или на английском языке
// // ba33b9986c51c571df0fa31815ded896 - API key полученный при регистрации
// // lang=ru - язык отображения описания погоды (можно указать lang=en)
// // units=metric - температура в градусах Цельсия (можно указать units=imperial для отображения температуры в градусах Фаренгейта)

async function getWeather() {
    localStorage.getItem('city') ? city.value = localStorage.getItem('city') : city.value = 'Minsk';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=ba33b9986c51c571df0fa31815ded896&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data['message'] !== 'city not found'){
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data['weather'][0].id}`);
        weatherDescription.textContent = data['weather'][0].description;
        temperature.textContent = `${Math.floor(data['main']['temp'])}°C`;
        windSpeed.textContent = `Wind speed: ${Math.floor(data['wind']['speed'])} m/s`;
        humidity.textContent = `Humidity: ${data['main']['humidity']} %`;
    } else {
        weatherIcon.className = '';
        weatherIcon.classList.remove();
        weatherDescription.textContent = '';
        temperature.textContent = '';
        windSpeed.textContent = '';
        humidity.textContent = '';
        weatherError.textContent = 'City not found';
    }
}

function setCity(event) {
    if (event.code === 'Enter') {
        localStorage.setItem('city', city.value);
        getWeather();
        city.blur();
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('keypress', setCity);



// SHOW QUOTES
async function getQuotes() {
    const quotes = '../data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let quoteNum = getRandomNum(0, data.length - 1);
    quote.textContent = data[quoteNum]['text'];
    author.textContent = data[quoteNum]['author'];
}

changeQuote.addEventListener('click', getQuotes);

