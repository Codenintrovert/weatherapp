const handlesubmit = (e) => {
    e.preventDefault();
    let cityUpdate = document.querySelector("#searchinput").value;
  
    citySearch(cityUpdate);
  };
  
  const citySearch = (cityUpdate) => {
    let apiKey = "c8e12975705052123d9cfa0ea9e49f3b";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityUpdate}&appid=${apiKey}&units=imperial`;
  
    axios.get(url).then(weather);
  };
  let div = document.querySelector(".searchbutton");
  div.addEventListener("click", handlesubmit);
  
  const weather = (response) => {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#summaryvalue").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector(".caption").innerHTML =
      response.data.weather[0].description;
    document.querySelector(".windvalue").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#pressure").innerHTML = response.data.main.pressure;
    document.querySelector(".humidityvalue").innerHTML =
      response.data.main.humidity;
    document.querySelector("#dewpoint").innerHTML = response.data.main.dew_point;
    document.querySelector("#visibility").innerHTML =
      response.data.main.visibility;
    document.querySelector("#feelslike").innerHTML = Math.round(
      response.data.main.feels_like
    );
  
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.weather[0].icon}.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  };
  
  const getCurrentLocation = (position) => {
    let apiKey = "c8e12975705052123d9cfa0ea9e49f3b";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  
    axios.get(url).then(weather);
  };
  
  const locationFunction = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  };
  
  let button = document.querySelector("#button");
  button.addEventListener("click", locationFunction);
  
  citySearch("New York");
  
  let current = new Date();
  
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  let date = current.getDate();
  let day = days[current.getDay()];
  let month = months[current.getMonth()];
  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  const rank = (day) => {
    if (day === 1 || day === 21 || day === 31) {
      return "st";
    } else {
      if (day === 2 || day === 22) {
        return "nd";
      } else {
        if (day === 3 || day === 23) {
          return "rd";
        } else {
          return "th";
        }
      }
    }
  };
  let dayRank = rank(date);
  
  let time = document.querySelector(".time-container");
  time.innerHTML = `${day}, ${month} ${date}${dayRank}, ${hours}:${minutes}`;
  