// defining DOM elements and global variables
let outputEl = document.getElementById("output");
let searchButton = document.getElementById("search-button");
let historyContainer = document.getElementById("history-container");
let fiveDayOutput = document.getElementById("five-day-output");

// storing API key in a variable for easier use
let apiKey = "40cd60c50feeb35b6cb5749e49f6c7bf";
// empty array to store searched cities for local storage
let cities = [];

// displays the weather cards for the next five days
function getFiveDay (fiveDayArray, temp, wind, humidity) {
    let date = dayjs().format('ddd, D MMM, YYYY. hh:mm A');
    let iconArray = [];
}

