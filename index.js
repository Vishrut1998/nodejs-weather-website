var $8OivB$path = require("path");
var $8OivB$express = require("express");
var $8OivB$hbs = require("hbs");
var $8OivB$constants = require("constants");
var $8OivB$request = require("request");

var $a826c173f4456cde$var$__dirname = "src";



var $2e819131835db416$exports = {};

const $2e819131835db416$var$geocode = (address, callback)=>{
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoidmlzaHJ1dDMxIiwiYSI6ImNrb254MHB0OTA0dmcybm9oNno5eTltbXQifQ.0RXIxO0huJD4ajMFyurlhA";
    $8OivB$request({
        url: geocodeUrl,
        json: true
    }, (error, { body: body })=>{
        if (error) callback("Unable to connect to Location Services", undefined);
        else if (body.features.length === 0) callback("Unable to find Location. Please try another search", undefined);
        else callback(undefined, {
            latitude: body.features[0].center[0],
            longitude: body.features[0].center[1],
            location: body.features[0].place_name
        });
    });
};
$2e819131835db416$exports = $2e819131835db416$var$geocode;


var $2bb60f64d139c4b7$exports = {};

const $2bb60f64d139c4b7$var$forecast = (latitude, longitude, callback)=>{
    // const {latitude , longitude , callback} = forecast => {
    const forecastUrl = `http://api.weatherstack.com/current?access_key=e153992628f37d346fea514423cb6541&query=${latitude},${longitude}&units=f`;
    $8OivB$request({
        url: forecastUrl,
        json: true
    }, (error, { body: body })=>{
        if (error) callback("Unable to connect to the services. Please check your network again!", undefined);
        else if (body.error) callback("Unable to fetch the cordinates. Please check the cordinates again", undefined);
        else {
            const { temperature: temperature, weather_descriptions: weather_descriptions, feelslike: feelslike, humidity: humidity } = body.current;
            callback(undefined, `${weather_descriptions}. It is currently ${temperature}\u00B0. Right now it feels like ${feelslike}\u00B0. The humidity is ${humidity}%.`);
        }
    });
};
$2bb60f64d139c4b7$exports = $2bb60f64d139c4b7$var$forecast;



var $a826c173f4456cde$require$RSA_NO_PADDING = $8OivB$constants.RSA_NO_PADDING;
const $a826c173f4456cde$var$app = $8OivB$express();
const $a826c173f4456cde$var$port = 3000;
//Define path for express config
const $a826c173f4456cde$var$publicDirectory = $8OivB$path.join($a826c173f4456cde$var$__dirname, "../public");
const $a826c173f4456cde$var$viewsPath = $8OivB$path.join($a826c173f4456cde$var$__dirname, "../templates/views");
const $a826c173f4456cde$var$partialsPath = $8OivB$path.join($a826c173f4456cde$var$__dirname, "../templates/partials");
//Setup handlebars engine and views location
$a826c173f4456cde$var$app.set("view engine", "hbs");
$a826c173f4456cde$var$app.set("views", $a826c173f4456cde$var$viewsPath);
$8OivB$hbs.registerPartials($a826c173f4456cde$var$partialsPath);
//Setup static directory to serve
$a826c173f4456cde$var$app.use($8OivB$express.static($a826c173f4456cde$var$publicDirectory));
$a826c173f4456cde$var$app.get("/help", (req, res)=>{
    res.render("help", {
        message: "For any help or queries, contact :",
        title: "Help",
        name: "Vishrut Sharma",
        contact: " +91 9540105285",
        emailId: "sharmavishrut1998@gmail.com"
    });
});
$a826c173f4456cde$var$app.get("", (req, res)=>{
    res.render("index", {
        title: "Weather App",
        name: "Vishrut Sharma"
    });
});
$a826c173f4456cde$var$app.get("/about", (req, res)=>{
    res.render("about", {
        title: "About me:",
        name: "Vishrut Sharma"
    });
});
$a826c173f4456cde$var$app.get("/weather", (req, res)=>{
    if (!req.query.address) return res.send({
        errror: "You must provide an address"
    });
    $2e819131835db416$exports(req.query.address, (error, { latitude: latitude, longitude: longitude, location: location } = {})=>{
        if (error) return res.send({
            error: error
        });
        $2bb60f64d139c4b7$exports(latitude, longitude, (error, forecastData)=>{
            if (error) return res.send({
                error: error
            });
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
});
$a826c173f4456cde$var$app.get("/products", (req, res)=>{
    if (!req.query.search) return res.send({
        error: "You must provide a search term"
    });
    console.log(req.query);
    res.send({
        products: []
    });
});
$a826c173f4456cde$var$app.get("/help/*", (req, res)=>{
    res.render("errors", {
        errorMessage: "Help article not found"
    });
});
$a826c173f4456cde$var$app.get("*", (req, res)=>{
    res.render("errors", {
        errorMessage: "404"
    });
});
$a826c173f4456cde$var$app.listen($a826c173f4456cde$var$port, ()=>{
    console.log("Server Started! on port" + $a826c173f4456cde$var$port);
});


//# sourceMappingURL=index.js.map
