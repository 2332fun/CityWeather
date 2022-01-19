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
                var searchEl = document.createElement("div");
                var searchAEl = document.createElement("a");
                var searchH5El = document.createElement("h4");
                var searchImgEl = document.createElement("img");
                searchImgEl.setAttribute("class", "AttractionImg");
                searchAEl.setAttribute("href", data._embedded.attractions[i].url);
                searchAEl.setAttribute("target", "_blank");
                searchImgEl.setAttribute("src", data._embedded.attractions[i].images[0].url);
                searchH5El.textContent = data._embedded.attractions[i].name;
                displaySearch.append(searchAEl);
                searchAEl.append(searchEl);
                searchEl.append(searchH5El);
                searchEl.append(searchImgEl);
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