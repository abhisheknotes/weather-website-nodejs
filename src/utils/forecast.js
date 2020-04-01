const request = require('request')

const forecast = (latitude, longitude, callbackforecast) => {

const url = 'https://api.darksky.net/forecast/c58d4bc957d3c19f3d4d5e3cf86f9fd9/' + latitude + ',' + longitude + '?units=si' 
// &lang=hi


request({url, json:true}, (error, {body})=>{

    if(error) {
        console.log('Kuch bada error hai')
    }

    else if (body.error) {

        console.log('Location sahi nahi hai')
    }

    else {

callbackforecast (undefined, 'Summary : ' + body.daily.data[0].summary+ ' Current temperature : ' + body.currently.temperature + ' degree celsius, and chance of rain : ' +  body.currently.precipProbability + ' %, and speed of wind is : ' + body.currently.windSpeed + '  km.') 

// callbackforecast (undefined, 'मौसम : ' + body.daily.data[0].summary+ ' , वर्तमान तापमान : ' + body.currently.temperature + ' डिग्री सेल्सियस है, और बारिश की संभावना : ' +  body.currently.precipProbability + ' प्रतिशत है, और हवा की गति है :' + body.currently.windSpeed + '   किमी है|') 
   
}

}
   
)
}



module.exports = forecast