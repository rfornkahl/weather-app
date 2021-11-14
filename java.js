function init(){
const form = document.querySelector(".top-banner form");
const text = document.querySelector(".top banner .text")
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "dc2172d7e5f8d91a0773e4e635072e2a";
function timeConverter(UNIX_timestamp){
    var milliseconds = new Date(UNIX_timestamp * 1000);
    var dateObject = new Date(milliseconds)
    var humandDateFormat = dateObject.toLocaleString();
    return dateObject.toLocaleString("en-US", {timeZoneName: "short"});
  }


  

    form.addEventListener("submit", event => {
    event.preventDefault();
    let inputVal = input.value;

  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0){
        const filteredArray = listItemsArray.filter(event2 => {
        let content = "";

        if (inputVal.includes(",")){
            if (inputVal.split(",")[1].length >2){
            inputVal = inputVal.split(",")[0];
            content = event2.querySelector(".city-name span").textContent.toLowerCase();
        } else {
            content = event2.querySelector("city-name").dataset.name.toLowerCase();
        }
    } else{
        content = event2.querySelector(".city-name span").textContent.toLowerCase();
    }
    return content == inputVal.toLowerCase();
    });
    if (filteredArray.length > 0){
        msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent}...otherwise be more specific by providing the country code/state as well.`;
    form.reset();
    input.focus();
    return;
    }
}


//.ajax part of the code
const zipURL = `https://api.openweathermap.org/data/2.5/weather?zip=${inputVal}&appid=${apiKey}&units=imperial`;
const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=imperial`;

fetch(zipURL)
    .then(response => response.json())
    .then(data => {

    const {main, name, sys, weather, wind} = data;
    const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]}.png`;   

  const li = document.createElement('li');
  li.classList.add('city');
  const markup = `
  <h2 class="city-name" data-name="${name},${sys.country}">
  <span>${name}</span>
  <sup>${sys.country}</sup>
  </h2>
  <div class ="city-temp">${Math.round(main.temp)}<sup>°F</sup>
  </div>
  <figure>
  <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
  <figcaption>${weather[0]["description"]}</figcaption>
  <div class ="city-wind"><p class= "weather-label">WIND SPEED: </p>${wind.speed}<sup> MPH</sup> </div>
  <div class ="city-wind"><p class= "weather-label">HUMIDTY: </p>${main.humidity}<sup> %</sup></div>
  <div class ="city-wind"><p class= "weather-label">MAX TEMP: </p>${main.temp_max}<sup>°</sup></div>
  <div class ="city-wind"><p class= "weather-label">MIN TEMP: </p>${main.temp_min}<sup>°</sup></div>
  <div class ="city-wind"><p class= "weather-label">SUNRISE: </p>${timeConverter(sys.sunrise)} AM</div>
  <div class ="city-wind"><p class= "weather-label">SUNSET: </p>${timeConverter(sys.sunset)} PM</div>
  </figure>  `;
  li.innerHTML = markup;
  list.appendChild(li);
})
//.catch(() => {

//    msg.textContent = "Please search for a zip code";
//});

fetch(cityURL)
    .then(response => response.json())
    .then(data => {

    const {main, name, sys, weather, wind} = data;
    const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]}.png`;   

  const li = document.createElement('li');
  li.classList.add('city');
  const markup = `
  <h2 class="city-name" data-name="${name},${sys.country}">
  <span>${name}</span>
  <sup>${sys.country}</sup>
  </h2>
  <div class ="city-temp">${Math.round(main.temp)}<sup>°F</sup>
  </div>
  <figure>
  <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
  <figcaption>${weather[0]["description"]}</figcaption>
  <div class ="city-wind"><p class= "weather-label">WIND SPEED: </p>${wind.speed}<sup> MPH</sup> </div>
  <div class ="city-wind"><p class= "weather-label">HUMIDTY: </p>${main.humidity}<sup> %</sup></div>
  <div class ="city-wind"><p class= "weather-label">MAX TEMP: </p>${main.temp_max}<sup>°</sup></div>
  <div class ="city-wind"><p class= "weather-label">MIN TEMP: </p>${main.temp_min}<sup>°</sup></div>
  <div class ="city-wind"><p class= "weather-label">SUNRISE: </p>${timeConverter(sys.sunrise)} AM</div>
  <div class ="city-wind"><p class= "weather-label">SUNSET: </p>${timeConverter(sys.sunset)} PM</div>
  </figure>  `;
  li.innerHTML = markup;
  list.appendChild(li);
})


.catch(() => {
    msg.textContent = "Please search for a valid city";
});


  msg.textContent ="";
  form.reset();
  input.focus();
    });
    }
  window.addEventListener("load", init);