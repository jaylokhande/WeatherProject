const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
  //res.send("Server is up");
});
app.post("/",function(req,res){
    const query = req.body.cityName ;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=020edcb2ba39587afdadea7e0df4252c";
    https.get(url,function(response) {
        console.log(response.statusCode);
        response.on("data",function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp ;
            const weatherDescription = weatherData.weather[0].description ;
            const icon = weatherData.weather[0].icon ;
            const imageURL = "http://openweathermap.org/img/wn/10d@2x.png"
            res.write("<p> the weather is </p>"+ weatherDescription);
            res.write("<h3>The tempeature in "+query+" is</h3>" + temp); 
            res.write("<img src="+imageURL +">");
            res.send();
        })
    })
    console.log("Post request ")
})



app.listen(3000,function(){
    console.log("Server is running ");
});