document.querySelector('#search-button').addEventListener('click', function(){
    fetch('http//localhost:3000/trip',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            departure: document.querySelector('#departure').value,
            arrival: document.querySelector('#arrival').value,
            date: document.querySelector('#date').value,
    })
})
.then(response => response.json())
.then(data => {
    if (data.result) {
        for (let i=0; i<data.trips.length ; i++){
            document.querySelectorAll('.trips-results').textContent = data.trips[i]
        }
    }else if(data.result == false){
        document.querySelector('#trips-image').src = '../images/notfound.png'
        document.querySelector('#trips-text').textContent = 'No trip found.'
    }

})
})