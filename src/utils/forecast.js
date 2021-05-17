const request = require('request')

const forecast = (latitude , longitude , callback) =>{

   // const {latitude , longitude , callback} = forecast => {

    const forecastUrl = `http://api.weatherstack.com/current?access_key=e153992628f37d346fea514423cb6541&query=${latitude},${longitude}&units=f`;
    
    request({url : forecastUrl , json : true}, (error , {body}) => {
        
        if(error){
            callback('Unable to connect to the services. Please check your network again!', undefined);
        }
        else if(body.error){
            callback('Unable to fetch the cordinates. Please check the cordinates again',undefined);
        }
        else{
            const {temperature , weather_descriptions} = body.current;
            callback(undefined , `The temperature is ${temperature}\u00B0F and the overall forecast is ${weather_descriptions}`)
        }

    })

}
module.exports = forecast