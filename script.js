const author = document.getElementById("img-author");
const cryptoTop = document.getElementById("crypto-top");
const crypto = document.getElementById("crypto");
const time = document.getElementById("time");
const weather = document.getElementById("weather");

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=universe"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    author.innerHTML = `Image by: ${data.user.name} - @${data.user.username}`;
  })
  .catch((err) => {
    console.log("Something went wrong:", err);
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`;
  });

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong!");
    }
    return res.json();
  })
  .then((data) => {
    cryptoTop.innerHTML = `<img src=${data.image.small}/>
    <span>${data.name}</span>`;

    crypto.innerHTML += `<p>🎯: ${data.market_data.current_price.usd}</p>
    <p>👆: ${data.market_data.high_24h.usd}</p>
    <p>👇: ${data.market_data.low_24h.usd}</p>`;
  })
  .catch((err) => console.log("Something went wrong:", err));

function getCurrentTime() {
  const date = new Date();
  time.textContent = date.toLocaleTimeString("en-us", { timeStyle: "medium" });
}
setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weather.innerHTML = `
        <img src=${iconUrl}/>
        <p class="temp">${Math.round(data.main.temp)}°C</p>
        <p class="city">${data.name}</p>
      `;
    })
    .catch((err) => console.error(err));
});
