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
        document.querySelector('#visualisation').innerHTML =''
        let trips = data.trips
        for (let i=0; i<trips.length ; i++){
            let time = moment(trips[i].date).format("hh:mm");
            console.log(time);
            document.querySelector('#visualisation').innerHTML += `
            <div class="journey"> 
            <div> <p>${trips[i].departure}>${trips[i].arrival}</p> </div>
            <div> <p>${time}</p> </div>
            <div> <p>${trips[i].price}€</p> </div>
            <div> <p>Departure in ... hours</p> </div>
            <div> <button class="book-btn">Book</button></div>
            </div>`
        }
    }else if(data.result === false){
        document.querySelector('#logo').src = '/Frontend/images/notfound.png'
        document.querySelector('#text-logo').textContent = 'No trip found.'
    }

})
})