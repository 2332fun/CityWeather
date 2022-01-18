//User inputs search bar, replaces keyword= with input
var searchBtn = document.querySelector('#searchBtn');
var getUserInput = function () {
    return document.querySelector('#search-box').value;
};

var searchCall = function () {
    document.querySelectorAll('.hide-banner').forEach(banner => {banner.classList.remove('hide-banner')});
    var artistinputEl = document.querySelector('#search-box');
    var artistinput = artistinputEl.value;
    var searchTerm = getUserInput();
    var url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=8cd14927b4cb4879b174cabe1c24f270`
    document.querySelector('.icon-block').innerHTML = '';
    document.querySelector('#displaySearch').innerHTML = '';

    fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${artistinput}&apikey=lXXeiiHp4jbagNs2QYj0n1bTm6Tr1Q2M`)
        .then(response => response.json())

        .then(function (data) {
            console.log(data)
            if (data.page.totalElements === 0) {
                displaySearch.textContent = 'No results found';
                return;
            }
            for (var i = 0; i < 3; i++) {
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
        })
}

searchBtn.addEventListener("click", searchCall);

$("#search-box").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#search-btn").click();
    }
});
var displaySearch = document.querySelector('#displaySearch');
