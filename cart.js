fetch("http://localhost:3000/selectedtrips/cart")
.then(response => response.json())
.then(data => {
    let trips = data.trips
    for(let i=0; i<trips.length ; i++){
        document.querySelector("#cart").innerHTML+=`
        <div class="journey-cart"> 
            <p>${trips[i].trip.departure}>${trips[i].trip.arrival}</p> 
            <p>${moment(trips[i].trip.date).format("hh:mm")}</p> 
            <p>${trips[i].trip.price}€</p> 
            <button id="${trips[i]._id}" class="delete-btn">X</button>
        </div>
        `
    }
})

