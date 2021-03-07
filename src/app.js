const { response } = require("express");
const p_request = require("postman-request");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
let weatherDate = "";
const url =
  "https://api.openweathermap.org/data/2.5/forecast/daily?q=Hebron&appid=cad86314552b94deb5b82fa8e5e1e33e";
p_request(url, (errror, response) => {
  //console.log(JSON.parse(response.body));
  weatherDate = JSON.parse(response.body);
});

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", {});
});
app.get("/about", (req, res) => {
  res.render("about", {
    about: "welcome to about page",
  });
});

app.get("/weather", (req, res) => {
  res.render("weather", {
    about: "welcome to weather page",
    data: weatherDate,
    description: weatherDate.list[0].weather[0].description,
    celciusDay: Math.round(parseFloat(weatherDate.list[0].temp.day) - 273.15),
    fahrenheitDay: Math.round(
      (parseFloat(weatherDate.list[0].temp.day) - 273.15) * 1.8 + 32
    ),
  });
});

app.listen(port, () => {
  console.log(`listinig to port ${port}`);
});
