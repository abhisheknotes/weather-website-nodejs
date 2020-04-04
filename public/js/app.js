console.log("Client side js file is loaded.");

const weatherForm = document.querySelector("form");
const searchterm = document.querySelector("input");
const messageOne = document.querySelector("#messageone");
const messageTwo = document.querySelector("#messagetwo");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = searchterm.value;

	messageOne.textContent = "Loading...";
	messageTwo.textContent = "";

	if (location == "") {
		return (messageOne.textContent = "Please provide an address.");
	}

	fetch("/weather?address=" + location).then((response) => {
		// if(!location)
		// {
		//     messageOne.textContent = noaddress
		// }

		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			}
		});
	});
});
