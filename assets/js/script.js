//User inputs search bar, replaces keyword= with input
var searchBtn = document.querySelector('#searchBtn');
var searchInputEl = document.querySelector('#search-box');
var searchInput = searchInputEl.value;

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

searchBtn.addEventListener("click", searchCall);

$("#search-box").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#search-btn").click();
    }
});
var displaySearch = document.querySelector('#displaySearch');
var searchHistory = document.querySelector('.searchHistory');

var searchHistoryFunction = function(event) {
    event.preventDefault();
    document.querySelector('.searchHistory').innerHTML = '';
    const searchHistoryBtns = ["historyBtn1", "historyBtn2", "historyBtn3", "historyBtn4", "historyBtn5", "historyBtn6", "historyBtn7"];
    console.log(searchHistoryBtns.length);

    for (var i = 0; i < searchHistoryBtns.length; i++)

        if (searchHistoryBtns[0]) {
            localStorage.setItem("historyItem1", searchInputEl.value);
            localStorage.getItem("historyItem1");
            searchHistoryBtns[0] = document.createElement("button");
            searchHistoryBtns[0].textContent = searchInputEl.value;
            searchHistory.append(searchHistoryBtns[0]);
            console.log(searchHistoryBtns[0]);
            searchHistoryBtns.length += 1;
        }
        if (searchHistoryBtns[1]) {
            localStorage.setItem("historyItem1", searchInputEl.value);
            localStorage.getItem("historyItem1");
            searchHistoryBtns[1] = document.createElement("button");
            searchHistoryBtns[1].textContent = searchInputEl.value;
            searchHistory.append(searchHistoryBtns[1]);
            console.log(searchHistoryBtns[1]);
            searchHistoryBtns.length += 1;
        }

};

searchHistoryFunction();