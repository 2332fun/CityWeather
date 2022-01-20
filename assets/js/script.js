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
    // if (historyCall) {
    //     var searchInput = searchHistorybtn.value;
    // }
    // else {
    //     var searchInput = searchInputEl.value;
    // }

    document.querySelector('#displaySearch').innerHTML = '';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=7dbc84f7c262272b1b3286380cc36962`)
        .then(response => response.json())

        .then(function (data) {

            //start of displayMain code
                var displaySearchEl = document.createElement("div");
                var displaySearchAEl = document.createElement("a");

                var displaySearchH2El = document.createElement("h2");
                displaySearchH2El.setAttribute("id", "displaySearchH2");
                displaySearchH2El.textContent = searchInputEl.value;

                var tempEl = document.createElement("div");
                tempEl.setAttribute("id", "temp");
                tempEl.setAttribute("class", "displayText");
                tempEl.textContent = "Temp: " + data.main.temp + "°F";

                var windEl = document.createElement("div");
                windEl.setAttribute("id", "wind");
                windEl.setAttribute("class", "displayText");
                windEl.textContent = "Wind: " + data.wind.speed + " MPH";

                var humidityEl = document.createElement("div");
                humidityEl.setAttribute("id", "humidity");
                humidityEl.setAttribute("class", "displayText");
                humidityEl.textContent = "Humidity: " + data.main.humidity + "%";

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
                //end of displayMain code

                //start of display5 code
                // var display5El = document.createElement ("div");
                // var display5AEl = document.createElement ("a");

                // var day1El = document.createElement("div");
                // day1El.setAttribute("id", "day1");

                // var date1El = document.createElement("p");
                // date1El.setAttribute("id", "date1");
                // date1El.setAttribute("class", "fiveDayText");
                // date1El.textContent = "Date: " + "date1 data goes here";

                // display5.append(display5AEl);
                // display5AEl.append(display5El);
                // display5El.append(date1El);
                //end of display5 code
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

// historyBtn.addEventListener("click", historyCall);

searchBtn.addEventListener("click", searchCall);
//Allows user to hit enter instead of clicking button to submit input
$("#search-box").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#search-btn").click();
    }
});