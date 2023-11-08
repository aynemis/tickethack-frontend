fetch("http://localhost:3000/selectedtrips/booking")
.then(response => response.json())
.then(data => {
    console.log(data)
    let bookings = data.bookings;
    if(bookings.length>0){
    for(let i=0; i<bookings.length ; i++){
        document.querySelector("#bookings").innerHTML+=`
        <div class="journey-cart"> 
            <p>${bookings[i].trip.departure}>${bookings[i].trip.arrival}</p> 
            <p>${moment(bookings[i].trip.date).format("hh:mm")}</p> 
            <p>${bookings[i].trip.price}€</p> 
            <p>Departure in ... hours</p>
        </div>
        `
    }
}else{
    document.querySelector("#cart").innerHTML+=`
        <p>No journeys!<p>`
}
})