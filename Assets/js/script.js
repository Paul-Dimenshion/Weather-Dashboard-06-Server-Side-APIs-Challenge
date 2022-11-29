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

  // dynamically created elements 
  let container = document.createElement("div");
  let header = document.createElement("h1");
  let tempEl = document.createElement("p");
  let windEl = document.createElement("p");
  let humidityEl = document.createElement("p");
  let iconEl = document.createElement("img");
