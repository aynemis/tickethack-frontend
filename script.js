var moment = require('moment');

document.querySelector('#search-button').addEventListener('click', function(){
    fetch('http://localhost:3000/trip',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            departure: document.querySelector('#departure').value,
            arrival: document.querySelector('#arrival').value,
            date: document.querySelector('#date-selection').value,
    })
})
.then(response => response.json())
.then(data => {
    console.log(data)
    if (data.result) {
        let trips = data.trips
        for (let i=0; i<trips.length ; i++){
            let time = moment(trips[i].date).format("hh:mm:ss a");
            console.log(trips[i]);
            document.querySelector('#visualisation').innerHTML = `
            <div class="journey"> 
            <p>${trips[i].departure}>${trips[i].arrival}</p> 
            <p>${time}</p>
            <p>${trips[i].price}</p>
            <p>Departure in ... hours</p>
            </div>`
        }
    }else if(data.result === false){
        document.querySelector('#logo').src = '../images/notfound.png'
        document.querySelector('#text-logo').textContent = 'No trip found.'
    }

})
})
// commentaire