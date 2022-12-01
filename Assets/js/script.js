let weather = {
    "apiKey": "40cd60c50feeb35b6cb5749e49f6c7bf",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
            + city // + country
            + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed +  " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener('keyup', function(event) {
    if (event.key == "Enter"){
        weather.search();
    }
})

weather.fetchWeather("Saint-Quentin");


// const input = document.getElementById('input');
// const body = document.getElementsByClassName('container')[0];

// // window.addEventListener('load', dayNightMode)

// input.addEventListener('keydown', function(event){
//     if(event.key === 'Enter')
//     loadImg();
// })

// function loadImg(){
//     removeImages();

//     const url = 'https://api.unsplash.com/search/photos/?query='+input.value+'&per_page=1&client_id=IX0h5C23NThCOgLE5GOnXUX_i1vfPKi2NTbmWKqcSsE';

//     fetch(url)
    
//     .then(response =>{
//         if(response.ok);
//             return response.json();
//     })
//     .then(data => {
//         const imageNodes = [];
//         for(let i = 0; i < data.results.length; i++){
//             imageNodes[i] = document.createElement('div');
//             imageNodes[i].className = 'img';
//             imageNodes[i].style.backgroundImage = 'url('+data.results[i].urls.raw+')';
//         // body.appendChild(imageNodes[i]);
//         }
//     })
// }

// function removeImages(){
//     container.innerHTML='';
// }

// function dayNightMode(){
//     const date = new Date();
//     const hour = date.getHours();

//     if ( hour >= 7 && hour <= 19 ){
//         document.container.style.backgroundColor = 'white';
//         document.container.style.color = 'black';
//     }
//     else {
//         document.container.style.backgroundColor = 'black';
//         document.container.style.color = 'white';
//     }
// }