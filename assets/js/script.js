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

    document.querySelector('#displaySearch').innerHTML = '';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=7dbc84f7c262272b1b3286380cc36962`)
        .then(response => response.json())

        .then(function (data) {

                var displaySearchEl = document.createElement("div");
                var displaySearchAEl = document.createElement("a");

                var displaySearchH2El = document.createElement("h2");
                displaySearchH2El.setAttribute("id", "displaySearchH2");
                displaySearchH2El.textContent = searchInputEl.value;

                var tempEl = document.createElement("div");
                tempEl.setAttribute("id", "temp");
                tempEl.setAttribute("class", "displayText");
                tempEl.textContent = "Temp: " + "temp data goes here" + "°F";

                var windEl = document.createElement("div");
                windEl.setAttribute("id", "wind");
                windEl.setAttribute("class", "displayText");
                windEl.textContent = "Wind: " + "wind data goes here" + " MPH";

                var humidityEl = document.createElement("div");
                humidityEl.setAttribute("id", "humidity");
                humidityEl.setAttribute("class", "displayText");
                humidityEl.textContent = "Humidity: " + "humidity data goes here" + "%";

                var uvEl = document.createElement("div");
                uvEl.setAttribute("id", "UV");
                uvEl.setAttribute("class", "displayText");
                uvEl.textContent = "UV Index: " + "UV data goes here";

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
        });
};

//Upon search submit; stores recent searches for display.
var searchHistoryFunction = function() {
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
        searchHistory.append(btn);
    }
};

searchBtn.addEventListener("click", searchCall);
//Allows user to hit enter instead of clicking button to submit input
$("#search-box").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#search-btn").click();
    }
});