import playList from './playList.js';

let language = localStorage.getItem('lang') ? localStorage.getItem('lang') : document.getElementsByTagName("html")[0].getAttribute("lang");
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

// localStorage.clear()

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
    let dayWeek = date.getDay();
    let dayNum = date.getDate();
    let month = date.getMonth();
    const monthRus = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const monthBel = ["студзеня", "лютага", "сакавiка", "красавiка", "мая", "червеня", "лiпеня", "жнiвеня", "верасеня", "кастрычнiка", "лiстапада", "снежаня"];
    const weekdayRus = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const weekdayBel = ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота",];

    // "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня"
    if (language === 'en') {
        const options = {weekday: 'long', day: 'numeric', month: 'long'};
        data.textContent = date.toLocaleDateString(language, options) // 'ru-RU', 'be-BE'
    } else if (language === 'ru') {
        data.textContent = `${weekdayRus[dayWeek]}, ${dayNum} ${monthRus[month]}`
    } else if (language === 'be') {
        data.textContent = `${weekdayBel[dayWeek]}, ${dayNum} ${monthBel[month]}`
    }
}


// SHOW GREETING
function showGreeting() {
    const greetingTextEng = [['Good', 'Good', 'Good'], ['morning', 'afternoon', 'evening', ' night'], ['[Enter name]']];
    const greetingTextRus = [['Доброе', 'Добрый', 'Доброй'], ['утро', 'день', 'вечер', ' ночи'], ["[Введите имя]"]];
    const greetingTextBel = [['Добрай', 'Добры', 'Дабра'], ['раніцы', 'дзень', 'вечар', 'нач'], ["[Увядзіце імя]"]];

    let greetingText = '';
    if (language === 'en') {
        greetingText = greetingTextEng;
        localStorage.getItem('name') ? name.value = localStorage.getItem('name') : name.placeholder = greetingTextEng[2][0];
    } else if (language === 'ru') {
        greetingText = greetingTextRus;
        localStorage.getItem('name') ? name.value = localStorage.getItem('name') : name.placeholder = greetingTextRus[2][0]
    } else if (language === 'be') {
        greetingText = greetingTextBel;
        localStorage.getItem('name') ? name.value = localStorage.getItem('name') : name.placeholder = greetingTextBel[2][0]
    }

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
    img.src = `https://raw.githubusercontent.com/Diskantis/momentum-stage1-tasks/assets/images/${timesOfDay}/${bgNum}.webp`

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
    let defaultCity = language === 'en' ? 'Minsk' : language === 'ru' ? 'Минск' : language === 'be' ? 'Минск' : ''
    city.value = localStorage.getItem('city') ? localStorage.getItem('city') : defaultCity;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=ba33b9986c51c571df0fa31815ded896&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    const weatherTextWind = [['Wind speed', 'Скорость ветра', 'Хуткасць ветру'], ['m/s','м/с','м/с']];
    const weatherTextHumidity = ['Humidity', 'Влажность', 'Вільготнасць']
    const weatherTextError = ['City not found', 'Город не найден', 'Горад не знойдзены']

    if (data['message'] !== 'city not found'){
        weatherError.textContent = '';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data['weather'][0].id}`);
        let str = typeof data['weather'][0].description === 'string' ? data['weather'][0].description : null;
        weatherDescription.textContent = str[0].toUpperCase() + str.slice(1);
        temperature.textContent = `${Math.floor(data['main']['temp'])}°C`;
        if (language === 'en'){
            windSpeed.textContent = `${weatherTextWind[0][0]}: ${Math.floor(data['wind']['speed'])} ${weatherTextWind[1][0]}`;
            humidity.textContent = `${weatherTextHumidity[0]}: ${data['main']['humidity']} %`;
        } else if (language === 'ru') {
            windSpeed.textContent = `${weatherTextWind[0][1]}: ${Math.floor(data['wind']['speed'])} ${weatherTextWind[1][1]}`;
            humidity.textContent = `${weatherTextHumidity[1]}: ${data['main']['humidity']} %`;
        } else if (language === 'be') {
            windSpeed.textContent = `${weatherTextWind[0][2]}: ${Math.floor(data['wind']['speed'])} ${weatherTextWind[1][2]}`;
            humidity.textContent = `${weatherTextHumidity[2]}: ${data['main']['humidity']} %`;
        }
    } else {
        weatherIcon.className = '';
        weatherIcon.classList.remove();
        weatherDescription.textContent = '';
        temperature.textContent = '';
        windSpeed.textContent = '';
        humidity.textContent = '';
        if (language === 'en'){
            weatherError.textContent = weatherTextError[0];
        } else if (language === 'ru') {
            weatherError.textContent = weatherTextError[1];
        } else if (language === 'be') {
            weatherError.textContent = weatherTextError[2];
        }
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


// SHOW QUOTES
async function getQuotes() {
    const quotes = './data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let quoteNum = getRandomNum(0, data.length - 1);
    if (data[quoteNum]['lang'] === language) {
        quote.textContent = data[quoteNum]['text'];
        author.textContent = data[quoteNum]['author'];
    } else {
        await getQuotes()
    }
}

changeQuote.addEventListener('click', getQuotes);


// SET PLAYER
const title = document.querySelector(".title");
const buttonPlay = document.querySelector(".play");
const buttonPrev = document.querySelector(".play-prev");
const buttonNext = document.querySelector(".play-next");
const progressBar = document.querySelector('.progress-bar');
const playUl = document.querySelector(".play-list");

let isPlaying = false;
let songIndex = 0;
let audio = new Audio();
title.textContent = '';
let currentTime = 0;

playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el['title']
    playUl.append(li)
})

let playItem = document.querySelectorAll('.play-item');
playItem.forEach((audio, index) => audio.addEventListener('click', () => {
    songIndex = index;
    currentTime = 0;
    toggleBtn()
}));

function playAndPause() {
    if (!isPlaying){
        audio.src = playList[songIndex]["src"];
        title.textContent = playList[songIndex]["title"];
        playItem.forEach(el => el.classList.remove('active'))
        playItem.forEach(el => el.classList.contains('active'))
        playUl.children[songIndex].classList.add('active')
        audio.currentTime = currentTime;
        audio.play();
        isPlaying = true;
    } else {
        audio.pause();
        buttonPlay.classList.remove('pause');
        currentTime = audio.currentTime;
        isPlaying = false;
    }
}

audio.addEventListener('ended', function(){
    nextSong();
});

function nextSong() {
    songIndex++;
    songIndex > playList.length - 1 ? songIndex = 0 : null;
    audio.src = playList[songIndex]["src"];
    isPlaying = false;
    currentTime = 0;
    toggleBtn();
}

function previousSong() {
    songIndex--;
    songIndex < 0 ? songIndex = playList.length - 1 : null;
    audio.src = playList[songIndex]["src"];
    isPlaying = false;
    currentTime = 0;
    toggleBtn();
}

function toggleBtn() {
    buttonPlay.classList.toggle('pause');
    playItem.forEach(el => el.classList.remove('active'))
    document.querySelector('.current-time').classList.remove('active')
    document.querySelector('.duration-time').classList.remove('active')
    // document.querySelector('.play-item::before').classList.remove('active')
    playAndPause()
}

buttonPlay.addEventListener('click', toggleBtn);
buttonNext.addEventListener('click', nextSong);
buttonPrev.addEventListener('click', previousSong);

function updateProgressValue() {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
    document.querySelector('.current-time').innerHTML = (formatTime(Math.floor(audio.currentTime)));
    if (formatTime(Math.floor(audio.duration)) !== "NaN:NaN") {
        document.querySelector('.duration-time').innerHTML = (formatTime(Math.floor(audio.duration)));
    } else {
        document.querySelector('.duration-time').innerHTML = "0:00";
    }
}

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){
        sec  = `0${sec}`;
    }
    return `${min}:${sec}`;
}

setInterval(updateProgressValue, 500);

function changeProgressBar() {
    audio.currentTime = progressBar.value;
    currentTime = audio.currentTime
}
progressBar.addEventListener('change', changeProgressBar);

audio.volume = 0.75;

const volumeSlider = document.querySelector(".volume-slider");
volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    document.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
}, false)

const volume = document.querySelector(".volume-button");
volume.addEventListener('click', () => {
    audio.muted = !audio.muted;
    if (audio.muted) {
        volume.classList.add("mute")
        document.querySelector(".volume-percentage").style.width = 1 + '%';
    } else if (!audio.muted) {
        volume.classList.remove("mute");
        document.querySelector(".volume-percentage").style.width = audio.volume * 100 + '%';
    }
});


// SETTINGS
const settings = document.querySelector(".settings-icon");
const windowSet = document.querySelector(".win-settings");

function toggleSet(){
    windowSet.classList.toggle('active');
}

settings.addEventListener('click', e => {
    e.stopPropagation();
    toggleSet();
})

document.addEventListener('click', e => {
    let target = e.target;
    let its_win = target === windowSet || windowSet.contains(target);
    let its_set = target === settings;
    let set_is_active = windowSet.classList.contains('active');
    if (!its_win && !its_set && set_is_active) {
        toggleSet();
    }
})

const appLanguage = ["Application Language:", "Язык приложения:", "Мова прыкладання:"]
const appLang = document.querySelector(".language-title");

function changeLangSet() {
    appLang.textContent = language === 'en' ? appLanguage[0] : language === 'ru' ?  appLanguage[1] : language === 'be' ? appLanguage[2] : "";
}
changeLangSet()

const langButtons = document.querySelectorAll(".lang-button");
langButtons.forEach(button => button.textContent.toLowerCase() === language ? button.classList.add('active') : null)

let langCount = 0;
langButtons.forEach((button) => button.addEventListener('click', () => {
    if (langCount <= 1 && !button.classList.contains('active')) {
        langButtons.forEach(button => button.classList.remove('active'));
        langCount = 0;
        button.classList.add('active');
        language = button.textContent.toLowerCase();
        localStorage.setItem('lang', language);
        langCount += 1;
        getWeather()
        getQuotes()
        changeLangSet()
    }
}));
