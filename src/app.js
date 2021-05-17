const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { RSA_NO_PADDING } = require('constants')

//Define path for express config
const publicDirectory = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectory))   



app.get('/help' , (req,res) => {
    res.render('help' , {
        message : 'Help Me , I am in trouble',
        title : 'Help',
        name : 'Vishrut Sharma'
    })
})


app.get('',(req,res) => {
    res.render('index' , {
        title : 'Weather App',
        name : 'Vishrut Sharma'
    })
    
})


app.get('/about' , (req,res) => {
    res.render('about' , {
        title : 'User',
        name : 'Vishrut Sharma'
    } )
})


app.get('/weather' , (req,res) => {

    if(!req.query.address){

        return res.send({
            errror : 'You must provide an address'
        })
    }
        geocode(req.query.address , (error , {latitude , longitude , location} = {}) => {

            if(error){
                return res.send({ error })
            }

            forecast(latitude, longitude, (error , forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast : forecastData,
                    location,
                    address : req.query.address
                })
            })


        })

    // }
    // res.send({
    //     forecast : 'Partly Cloudy',
    //     location : 'Delhi',
    //     address : req.query.address
    // })
})

app.get('/products' , (req,res) => {

    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products : []
        })
})

app.get('/help/*' , (req , res) => {
    res.render('errors' , {

        errorMessage : 'Help article not found'

    })
})


app.get('*' , (req , res) => {

    res.render('errors' , {

        errorMessage : '404'

    })
})


app.listen(3000 , () => {

    console.log('Server Started! on port 3000');

})