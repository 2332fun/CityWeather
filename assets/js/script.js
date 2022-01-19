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

    document.querySelector('#displaySearch').innerHTML = '';

    fetch(`https://api.openweathermap.org/data/2.5/onecall?timezone=${searchInput}&exclude=hourly,daily&appid={7dbc84f7c262272b1b3286380cc36962}`)
        .then(response => response.json())

        .then(function (data) {
            console.log(data);
            //FIX FOR ONE CALL API; NO TOTALELEMENTS
            if (data.page.totalElements === 0) {
                displaySearch.textContent = 'No results found';
                return;
            }
            for (var i = 0; i < 3; i++) {
                //FIX TO FIT ONE CALL API INFO: TEMP, WIND, HUMIDITY, UV
                var displaySearchEl = document.createElement("div");

                var displaySearchAEl = document.createElement("a");
                displaySearchAEl.setAttribute("href", data._embedded.attractions[i].url);
                displaySearchAEl.setAttribute("target", "_blank");


                var displaySearchH2El = document.createElement("h2");
                displaySearchH2El.textContent = searchInputEl.value;


                var displaySearchImgEl = document.createElement("img");
                displaySearchImgEl.setAttribute("class", "Symbol");
                // displaySearchImgEl.setAttribute("src", data._embedded.attractions[i].images[0].url);

                displaySearch.append(displaySearchAEl);
                displaySearchAEl.append(displaySearchEl);
                displaySearchEl.append(displaySearchH2El);
                displaySearchEl.append(displaySearchImgEl);
            }
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