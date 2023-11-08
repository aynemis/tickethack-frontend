function totalPrice () {
    let total = 0;
    let prices = document.querySelectorAll(".price")

    for (let i = 0; i < prices.length; i++) {
      
      total += Number(prices[i].textContent)
      
    }
    
    return total;
  }

function getTrips(){  
fetch("http://localhost:3000/selectedtrips/cart")
.then(response => response.json())
.then(data => {
    let trips = data.trips;
    if(trips.length>0){
        let prixTotal= 0;
    for(let i=0; i<trips.length ; i++){
        document.querySelector("#cart").innerHTML+=`
        <div class="journey-cart"> 
            <p>${trips[i].trip.departure}>${trips[i].trip.arrival}</p> 
            <p>${moment(trips[i].trip.date).format("hh:mm")}</p> 
            <p><span class="price">${trips[i].trip.price}</span>€</p> 
            <button id="${trips[i]._id}" class="delete-btn">X</button>
        </div>
        `
        document.querySelector("#prix-total").textContent = totalPrice()
    }
}else{
    document.querySelector("#cart").innerHTML+=`
        <p>No journeys in your cart!<p>`
}

    purchase();
    deleteTrip();
})
}

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
   const deleteButton = document.querySelectorAll(".delete-btn")
   for(let i = 0; i < deleteButton.length; i++){
    deleteButton[i].addEventListener("click", function(){
            fetch("http://localhost:3000/selectedtrips/cart",{
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id:this.id})
            })
            .then(()=> {
                const deletedList = document.querySelectorAll(".delete-btn");
                for( let i = 0; i < deletedList.length; i++) {
                    deletedList[i].addEventListener("click", function(){
                        this.parentNode.remove()
                    })
                }
                console.log("deletedList")
                document.querySelector("#prix-total").textContent = totalPrice()
            })
        
  })}
}

getTrips()