const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log("server has started and is on port " + port);
});

//Define path for express configuration

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../pages/views");
const partialsPath = path.join(__dirname, "../pages/partials");

// Handlers engine and views location

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Abhishek Soni",
		footname: "Boost",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		name: "Abhishek Soni",
		title: "About",
		location: "Hindustan",
		footname: "Boost",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		name: "Abhishek Soni",
		title: "Help Page",
		message: "Stay safe at home and save your life from COVID",
		footname: "Boost",
	});
});

app.get("/weather", async (req, res) => {
	const addressresponse = await req.query.address;
	const noaddress = "Please provide the address!";
	if (!addressresponse) {
		return res.send(noaddress);
	}

	console.log(req.query.address);

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			try {
				if (error) {
					return res.send({ error });
				}

				forecast(latitude, longitude, (error, outputforecast) => {
					if (error) {
						return res.send({ error });
					}

					res.send({
						forecast: outputforecast,
						location: location,
						address: req.query.address,
					});
				});
			} catch (e) {
				res.send({ error });
			}
		}
	);
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "Missing Help Page Link",
		name: "Abhishek Soni on Help Page",
		footname: "Boost, (obviously)",
		error_message: "This help article might not be found.",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "Lost Page",
		name: "Abhishek Soni",
		footname: "Boost",
		error_message: "Kuch to gadbad chal rahi hai daya",
	});
});
