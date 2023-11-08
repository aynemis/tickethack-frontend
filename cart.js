fetch("http://localhost:3000/selectedtrips/cart")
.then(response => response.json())
.then(data => {
    let trips = data.trips;
    if(trips.length>0){
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
}else{
    document.querySelector("#cart").innerHTML+=`
        <p>No journeys in your cart!<p>`
}

    purchase();
    deleteTrip();
})

function purchase (){
document.querySelector("#purchase-btn").addEventListener("click", function(){

    if(document.querySelectorAll(".journey-cart").length>0){
        fetch("http://localhost:3000/selectedtrips/bookings",{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        })
        .then(()=> {
            console.log("Purchase OK")
            window.location.assign("http://127.0.0.1:5500/Frontend/booking.html")
        })
    }else{
        document.querySelector("#cart").innerHTML=`
        <p>No journeys in your cart! Please add a journey.<p>`
    }
})
}

function deleteTrip (){
    document.querySelectorAll(".delete-btn").addEventListener("click", function(){
            fetch("http://localhost:3000/selectedtrips/cart",{
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            })
            .then(()=> {
                const deletedList = document.querySelectorAll(".delete-btn");
                for( let i = 0; i < deletedList.length; i++) {
                    deletedList[i].addEventListener("click", function(){
                        this.parentNode.remove()
                    })
                }
                console.log("deletedList")
                
            })
  })
}
