// Update comment for heroku deployment
const request = require("request");

const forecast = (latitude, longitude, callbackforecast) => {
	const url =
		"https://api.darksky.net/forecast/c58d4bc957d3c19f3d4d5e3cf86f9fd9/" +
		encodeURIComponent(latitude) +
		"," +
		encodeURIComponent(longitude) +
		"?units=si";
	// &lang=hi

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			console.log("Something is wrong.");
		} else if (body.error) {
			console.log("Location might be incorrect.");
		} else {
			callbackforecast(
				undefined,
				"Summary : " +
					body.daily.data[0].summary +
					" Current temperature : " \n +
					body.currently.temperature +
					" degree celsius, and chance of rain : \n" +
					body.currently.precipProbability +
					" %, \n and speed of wind is : " +
					body.currently.windSpeed +
					"  km."
			);
		}
	});
};

module.exports = forecast;
