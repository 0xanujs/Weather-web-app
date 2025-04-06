const { response } = require('express');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res)=> {
  res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res)=>{
  console.log("the request is received")
  const querry = req.body.cityName
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+querry+'&appid='+apiKey+'&units=metric'
  https.get(url, (response) => {
    // console.log(response.statusCode);
    response.on('data', (data)=>{
      // console.log(data)
      const weatherData = JSON.parse(data);
    // console.log(weatherData)
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description
    res.write("<h1>The temperature in "+querry+ " is "  + temp + " degree celsius</h1>")
    res.write("<p>The weather description is " + description + "</p>")
    })
  })
})



app.listen(3000, ()=> console.log("Our server is running at port 3000"))