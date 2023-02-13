const express = require("express");
const https = require("https");
const bodyPaser = require("body-parser");

const app = express();

app.use(bodyPaser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    
    //Using OpenWeather API to get the live data
    const query = req.body.cityName
    const apiKey = " " //Type in your appId
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey+"&units=metric";
    //Making a http get request to get data as JSON format
    https.get(url, function(response){
        console.log(response.statusCode);
        //Parsing the json data and getting speicific item in the jason objects
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            //console.log(weatherData);

            const temp = weatherData.main.temp
            //console.log(temp);
            
            const weatherDesc = weatherData.weather[0].description
            //console.log(weatherDesc);

            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/"+icon +"@2x.png"
            
            //Sending it back to the browser in html form we want
            res.write("<h1>The temperature in " + query + " is "+temp+ " degrees celsius<h1>")
            res.write( + "<h2>The weather is currently "+weatherDesc+"</h2>")
            res.write("<img src=" + imgURL + ">")
            res.send();
        })
});
})


app.listen(3000,function(){
    console.log("server running on port 3000");
})
