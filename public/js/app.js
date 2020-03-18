console.log('Client side js file is loaded.')


const weatherForm = document.querySelector('form')
const searchterm = document.querySelector('input')
const messageOne = document.querySelector('#messageone')
const messageTwo = document.querySelector('#messagetwo')






weatherForm.addEventListener('submit', (e) =>{



    e.preventDefault()
    const location = searchterm.value

    messageOne.textContent = 'Baby, its loading...'
    messageTwo.textContent = ''





    fetch('/weather?address='+ location) .then((response) => {

    response.json().then((data) => {

    if (data.error) {
    //    console.log(data.error) 
    messageOne.textContent = data.error
    }

    else {
        // console.log(data.location)
    // console.log(data.forecast)
    messageOne.textContent = data.location
    messageTwo.textContent = data.forecast

    
    }

})
}

)
})
