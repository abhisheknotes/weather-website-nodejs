const request = require('request')

const forecast = (latitude, longitude, callbackforecast) => {

const url = 'https://api.darksky.net/forecast/c58d4bc957d3c19f3d4d5e3cf86f9fd9/' + latitude + ',' + longitude + '?units=si&lang=hi'


request({url, json:true}, (error, {body})=>{

    if(error) {
        console.log('Kuch bada error hai system me')
    }

    else if (body.error) {

        console.log('Location sahi nahi daali')
    }

    else {

callbackforecast (undefined, 'Mausam is : ' + body.daily.data[0].summary + ' The current temperature is ' + body.currently.temperature + ' and barsat ka chance is ' +  body.currently.precipProbability) 
   
}

}
   
)
}



module.exports = forecast