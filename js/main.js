let search = document.querySelector('#searchInput')
search.addEventListener('keyup', function (e) {
  connect(e.target.value) // getting location
})
connect() // getting default location

let data;
async function connect(location = 'cairo') {
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b9d24bebae84437b961162802231802&q=${location}&days=3`);
  var tempdata = await response.json();
  data = tempdata
  displayTemp()
  backgroundChanger()
}
// display 
function displayTemp() {
  // get the time of the location
  let date = new Date(data.location.localtime)
  // array of week days
  let allDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // to get the day use getday() method
  let day = date.getDay() // return 0 and the week begin form sunday not saturday
  let allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // array of year months
  // to get the month use getMonth() method
  let month = date.getMonth() // return 1 = feb

  document.querySelector('.degree').innerHTML = `${data.current.temp_c}&#176;`
  document.querySelector('#location').innerHTML = `${data.location.name}`
  document.querySelector('#current-mood').innerHTML = `${data.current.condition.text}`
  document.querySelector('#mood-icon').src = `${data.current.condition.icon}`
  document.querySelector('#time').innerHTML = `${date.getHours()}:${date.getMinutes()} - ${allDays[day]},${date.getDate()}${allMonths[month]}`
  document.querySelector('#wind').innerHTML = `${data.current.wind_kph}km/h`
  document.querySelector('#clouds').innerHTML = `${data.current.cloud}%`
  document.querySelector('#humidity').innerHTML = `${data.current.humidity}%`
  // next day
  document.querySelector('#nextMaxtemp_c').innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}&#176`
  document.querySelector('#nextMintemp_c').innerHTML = `${data.forecast.forecastday[1].day.mintemp_c}&#176`
  document.querySelector('#nextIcon').src = `${data.forecast.forecastday[1].day.condition.icon}`
  // after day
  document.querySelector('#afterMaxtemp_c').innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}&#176`
  document.querySelector('#afterMintemp_c').innerHTML = `${data.forecast.forecastday[2].day.mintemp_c}&#176`
  document.querySelector('#afterIcon').src = `${data.forecast.forecastday[2].day.condition.icon}`


  // get next days
  if (day == 6) {
    document.querySelector('#nextDay').innerHTML = allDays[0]
    document.querySelector('#afterDay').innerHTML = allDays[1]
  } else {
    document.querySelector('#nextDay').innerHTML = allDays[day + 1]
    console.log(day);
    if (day == 5) {
      document.querySelector('#afterDay').innerHTML = allDays[0]
    } else {
      document.querySelector('#afterDay').innerHTML = allDays[day + 2]
    }
  }
  document.querySelector('.loading').style.display = 'none'

}
// background changer
function backgroundChanger() {
  let code = data.current.condition.code
  if (data.current.is_day == 0) {
    if (code == 1000) {
      document.querySelector("main").style.backgroundImage = 'url(../images/night/clear.jpg)'
    } else if (code == 1003 || code == 1009 || code == 1030 || code == 1069 || code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282) {
      document.querySelector("main").style.backgroundImage = 'url(../images/night/cloudy.jpg)'
      //rainy
    } else if (code == 1063 ||
      code == 1069 ||
      code == 1072 ||
      code == 1150 ||
      code == 1153 ||
      code == 1180 ||
      code == 1183 ||
      code == 1186 ||
      code == 1189 ||
      code == 1192 ||
      code == 1195 ||
      code == 1204 ||
      code == 1207 ||
      code == 1240 ||
      code == 1243 ||
      code == 1246 ||
      code == 1249 ||
      code == 1252
    ) {
      document.querySelector("main").style.backgroundImage = 'url(../images/night/rainy.jpg)'
    } else {
      document.querySelector("main").style.backgroundImage = 'url(../images/night/snow.jpg)'

    }
  } else {
    if (code == 1000) {
      document.querySelector("main").style.backgroundImage = 'url(../images/day/clear.jpg)'
    } else if (code == 1003 || code == 1009 || code == 1030 || code == 1069 || code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282) {
      document.querySelector("main").style.backgroundImage = 'url(../images/day/cloudy.jpg)'
      //rainy
    } else if (code == 1063 ||
      code == 1069 ||
      code == 1072 ||
      code == 1150 ||
      code == 1153 ||
      code == 1180 ||
      code == 1183 ||
      code == 1186 ||
      code == 1189 ||
      code == 1192 ||
      code == 1195 ||
      code == 1204 ||
      code == 1207 ||
      code == 1240 ||
      code == 1243 ||
      code == 1246 ||
      code == 1249 ||
      code == 1252
    ) {
      document.querySelector("main").style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)) ,url(../images/day/rainy.jpg)'
    } else {
      document.querySelector("main").style.backgroundImage = 'url(../images/day/snow.jpg)'

    }
  }
}

