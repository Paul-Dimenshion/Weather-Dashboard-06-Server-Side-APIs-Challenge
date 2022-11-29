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
    let date = dayjs().format("DD, MMMM, YYYY");
    let iconArray = [];

    // dynamically created elements 
    let container = document.createElement("div");
    let header = document.createElement("h1");
    let tempEl = document.createElement("p");
    let windEl = document.createElement("p");
    let humidityEl = document.createElement("p");
    let iconEl = document.createElement("img");

    // finds the first five weather icons in the API data and pushes them to the empty array above so that they can be later added to the forecast cards
    for (i = 0; i < 5; i++) {
        iconArray.push(fiveDayArray[i].weather[0].icon);
    }

    // similar to the current day forecast function, the if statement will look to see if the five day forecast container already exists - if it does, it will remove it and call this function again, otherwise it will create the dynamic elements below
    if (document.querySelector("#five-day") === null) {
        container.setAttribute("class", "box is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center");
        container.setAttribute("id", "five-day");

        if (document.querySelector("#five-day-header") === null) {
            header.setAttribute("class", "title is-3 custom-header");
            header.setAttribute("id", "five-day-header");
            header.textContent = "5 Day Forecast";
        }

        fiveDayOutput.appendChild(header);
        fiveDayOutput.appendChild(container);

        // using a loop since there needs to be 5 days shown on the forecast (iterating through the API data 5 times to generate the results to the screen)
        for (i = 0; i < 5; i++) {
            // dynamic HTML elements
            let card = document.createElement("div");
            let cardContent = document.createElement("div");
            let cardHeader = document.createElement("p");
            let iconSrc = `https://api.openweathermap.org/img/w/${iconArray[i]}.png`;

            // using the current date from day.js, adding a day each iteration to construct five future dates 
            let addDaysToDate = dayjs(date, "DD, MMMM, YYYY").add(i+1, 'd');
            var day = addDaysToDate.format('DD');
            var month = addDaysToDate.format('MMM');
            var year = addDaysToDate.format('YYYY');
            let futureDate = `${month} ${day}, ${year}`;

            // setting attributes for dynamic elements
            card.setAttribute("class", "card custom-card");
            cardHeader.setAttribute("class", "card-header-title");
            cardContent.setAttribute("class", "card-content");
            iconEl.setAttribute("src", iconSrc);
            
            // setting text content for dynamic elements using the API data and moment.js variables defined above
            cardHeader.textContent = `${futureDate}`;
            tempEl.textContent = `Temp: ${fiveDayArray[i].temp.day} F`;
            windEl.textContent = `Wind: ${fiveDayArray[i].wind_speed} mph`;
            humidityEl.textContent = `Humidity: ${fiveDayArray[i].humidity}%`;

            // appending elements to the appropriate containers to display the results on the screen
            card.appendChild(cardHeader);
            cardHeader.append(iconEl.cloneNode(true));
            card.appendChild(cardContent);
            cardContent.appendChild(tempEl.cloneNode(true));
            cardContent.appendChild(windEl.cloneNode(true));
            cardContent.appendChild(humidityEl.cloneNode(true));
            container.appendChild(card);
        }

    } else {
        document.querySelector("#five-day").remove();
        getFiveDay (fiveDayArray, temp, wind, humidity);
    }
}

// displays the weather for the current date
function getCurrentDay (location, temp, wind, humidity, uvIndex, icon) {
    // using day.js to get the current day
    let currentDate = dayjs().format("DD, MMMM, YYYY");
    // generating the source link for the weather icons
    let iconSrc = `https://api.openweathermap.org/img/w/${icon}.png`;

    // variables to create new HTML elements that results will be appended to
    let box = document.createElement("div");
    let header = document.createElement("h1");
    let dateEl = document.createElement("h1");
    let tempEl = document.createElement("p");
    let windEl = document.createElement("p");
    let humidityEl = document.createElement("p");
    let uvEl = document.createElement("span");
    let iconEl = document.createElement("img");

    // generate and append the current weather elements only if they do not currently exist in the HTML document
    if (document.querySelector("#current-weather") === null) {
        // setting attributes for dynamically generated elements
        header.setAttribute("class", "title is-3");
        dateEl.setAttribute("class", "subtitle");
        iconEl.setAttribute("src", iconSrc);
        box.setAttribute("class", "box");
        box.setAttribute("id", "current-weather");

        // setting the text content of dynamically generated elements using the data from the API passed in to this function
        header.textContent = `${location}`;
        dateEl.textContent = `${currentDate}`;
        tempEl.textContent = `Temp: ${temp} F`;
        windEl.textContent = `Wind: ${wind} mph`;
        humidityEl.textContent = `Humidity: ${humidity}%`;
        uvEl.textContent = `UV Index: ${uvIndex}`;

        // coloring the UV index tag based on the level/intensity of the value
        if (uvIndex < 3) {
            uvEl.setAttribute("class", "tag is-success");
        } else if (uvIndex < 7) {
            uvEl.setAttribute("class", "tag is-warning");
        } else {
            uvEl.setAttribute("class", "tag is-danger");
        }

        // building the output by appending the appropriate elements together
        header.append(iconEl);
        box.appendChild(header);
        box.appendChild(dateEl);
        box.appendChild(tempEl);
        box.appendChild(windEl);
        box.appendChild(humidityEl);
        box.appendChild(uvEl);
        outputEl.appendChild(box);

    } else {
        // if there is already a current day weather forecast displayed on the page, remove that element and then call this function again with the same inputs - will generate a new current day forecast instead of adding a second one to the page
        document.querySelector("#current-weather").remove();
        getCurrentDay(location, temp, wind, humidity, uvIndex, icon);
    }
}