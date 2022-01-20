//Global Variables
var searchBtn = document.querySelector('#searchBtn');
var searchInputEl = document.querySelector('#search-box');
var searchInput = searchInputEl.value;
var displaySearch = document.querySelector('#displaySearch');
var searchHistory = document.querySelector('#searchHistory');
let searchHistoryBtns = [];

//function executed upon submitting input
var searchCall = function (event) {
    event.preventDefault();
    searchHistoryFunction();
    var searchInputEl = document.querySelector('#search-box');
    var searchInput = searchInputEl.value;
    currentWeatherAPI(searchInput);

    document.querySelector('#displaySearch').innerHTML = '';

}

var currentWeatherAPI = function (search) {

    console.log("Term in fetch 1: ", search)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=7dbc84f7c262272b1b3286380cc36962`)
        .then(response => response.json())

        .then(function (data) {

            oneCall(data.coord.lat, data.coord.lon, search)
        });
};

var oneCall = function (lat, lon, city) {
    var oneCallKey = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=7dbc84f7c262272b1b3286380cc36962`;
    fetch(oneCallKey)
        .then(response => response.json())
        .then(function (data) {

            console.log(data)

            //start of displayMain code

            document.querySelector('#displaySearch').innerHTML = '';

            var displaySearchEl = document.createElement("div");
            var displaySearchAEl = document.createElement("a");

            //moment.js for today's date
            var displaySearchH2El = document.createElement("h2");
            displaySearchH2El.setAttribute("id", "displaySearchH2");
            displaySearchH2El.textContent = city;

            var tempEl = document.createElement("div");
            tempEl.setAttribute("id", "temp");
            tempEl.setAttribute("class", "displayText");
            tempEl.textContent = "Temp: " + data.current.temp + "°F";

            var windEl = document.createElement("div");
            windEl.setAttribute("id", "wind");
            windEl.setAttribute("class", "displayText");
            windEl.textContent = "Wind: " + data.current.wind_speed + " MPH";

            var humidityEl = document.createElement("div");
            humidityEl.setAttribute("id", "humidity");
            humidityEl.setAttribute("class", "displayText");
            humidityEl.textContent = "Humidity: " + data.current.humidity + "%";

            var uvEl = document.createElement("div");
            uvEl.setAttribute("id", "UV");
            uvEl.setAttribute("class", "displayText");
            uvEl.textContent = "UV Index: " + data.current.uvi;

            var displaySearchImgEl = document.createElement("img");
            displaySearchImgEl.setAttribute("class", "Symbol");

            displaySearch.append(displaySearchAEl);
            displaySearchAEl.append(displaySearchEl);
            humidityEl.append(uvEl);
            windEl.append(humidityEl);
            tempEl.append(windEl);
            displaySearchH2El.append(tempEl);
            displaySearchEl.append(displaySearchH2El);
            displaySearchEl.append(displaySearchImgEl);
            //end of displayMain code

            //start of display5 code
            document.querySelector('#fiveDay').innerHTML = '';
            var fiveDay = document.querySelector("#fiveDay")

            for (var i=1; i<6; i++){
                //create the card
                var day1El = document.createElement("div");
                day1El.setAttribute("id", "day1");
                //create all elements in the card   
               var date1El = document.createElement("p");
               date1El.setAttribute("id", "date1");
                //give elements any classes that you want
               date1El.setAttribute("class", "fiveDayText");
                //give elements text content
                //moment.js
               date1El.textContent = "Date: " + data.daily[i].humidity;
                //apend elements to card
                //append card to page
               day1El.append(date1El);
                fiveDay.append(day1El);
            // <div id="day1">
            //     <p id="date1">date</p>
            //     <p id="symbol1">symbol</p>
            //     <p id="temp1">temp</p>
            //     <p id="wind1">wind</p>
            //     <p id="humidity1">humidity</p>
            // </div>
            }
        })
}

//Upon search submit; stores recent searches for display.
var searchHistoryFunction = function () {
    document.querySelector('#searchHistory').innerHTML = '';
    if (searchHistoryBtns.length >= 7) {
        // Drops the oldest search History and replaces it with the newest one.
        searchHistoryBtns.shift();
    }
    searchHistoryBtns.push(searchInputEl.value);
    for (var i = 0; i < searchHistoryBtns.length; i++) {
        localStorage.setItem("historyItem" + i, searchHistoryBtns[i]);
        localStorage.getItem("historyItem" + i);
        let btn = document.createElement("button");
        btn.textContent = searchHistoryBtns[i];
        btn.setAttribute("value", searchHistoryBtns[i]);
        searchHistory.append(btn);

        btn.addEventListener("click", function () {
            document.querySelector('#displaySearch').innerHTML = '';
            var historySearchTerm = this.value;
            console.log("HistorySearchTerm", historySearchTerm)
            currentWeatherAPI(historySearchTerm);
        });
    }
};

searchBtn.addEventListener("click", searchCall);
//Allows user to hit enter instead of clicking button to submit input
$("#search-box").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#search-btn").click();
    }
});