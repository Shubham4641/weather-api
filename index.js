const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/weather.html");


         });

         app.post("/", function(req, res)
         {

             const query = req.body.cityname;
             const apikey = "038f43f152527d47fb4b37b19c95cc41";
             const unit = "metric";
         
             const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit +
             https.get(url, function(response)
             {
                 console.log(response.statusCode);
        
                 response.on ("data", function(data)
                     {
                         const weatherdata = JSON.parse(data);
                           
                     const temp = weatherdata.main.temp
                     
         
                     const weatherdescription = weatherdata.weather[0].description
         
                     const icon = weatherdata.weather[0].icon
         
                     const imageURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";
         
                     res.write("<p>The weather description is " + weatherdescription+ "</p>");
         
         
                     res.write("<h1>the temperature in" +query+ " is " + temp + " degree celcius.</h1>");
         
                     res.write("<img src=" +imageURL + ">");
                     res.send();
        
         });
         
         });

        })




app.listen(3000, function () {
    console.log("Server started on port 3000");
});