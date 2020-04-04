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
    } else if (location == "#" || location == ";") {
        return (messageOne.textContent = "Invalid input");
    } else
        fetch("/weather?address=" + location).then((response) => {
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