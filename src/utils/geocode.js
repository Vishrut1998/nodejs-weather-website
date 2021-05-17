const request = require('request')
const geocode = (address , callback) => {

const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoidmlzaHJ1dDMxIiwiYSI6ImNrb254MHB0OTA0dmcybm9oNno5eTltbXQifQ.0RXIxO0huJD4ajMFyurlhA'

    request({url : geocodeUrl , json : true}, (error, {body})=> {
        console.log(body.features.length);
        if(error){
            callback('Unable to connect to Location Services' , undefined)
        }
        else if(body.features.length===0){

            callback('Unable to find Location. Please try another search' , undefined)

        }
        
        else{
            callback(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name 
            })
        }
    })

}

module.exports = geocode