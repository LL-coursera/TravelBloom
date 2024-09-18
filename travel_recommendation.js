async function searchFunction() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchMap = {
        countries: 'countries',
        beaches: 'beaches',
        temples: 'temples'
    };
    let searchdata
    // Loop through the keys of the searchMap and check if the search key is included
    for (let key in searchMap) {
        if (key.includes(searchInput)) {
            searchdata = await fetchAPi(searchMap[key]);
            break; // Break the loop once a match is found to avoid unnecessary checks
        }
    }
    console.log(searchdata)
    displayBeaches(searchdata);

}

function resetFunction() {
    document.getElementById('searchInput').value = '';
    const beachContainer = document.getElementById('beachResults');
    beachContainer.innerHTML = '';
}

async function fetchAPi(searchkey) {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        return data[searchkey];
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayBeaches(beaches) {
    const beachContainer = document.getElementById('beachResults');
    beachContainer.innerHTML = ''; // Clear previous results
    beaches.forEach(beach => {
        console.log(beach)
        let citydisplay = beach.cities
        const beachDiv = document.createElement('div');
        beachDiv.classList.add('beach-item');

        const name = document.createElement('h2');
        name.textContent = beach.name;
        beachDiv.appendChild(name);

        if(!citydisplay){
            const description = document.createElement('p');
            description.textContent = beach.description;
    
            const image = document.createElement('img');
            image.src = beach.imageUrl;
            image.alt = beach.name;
    
            beachDiv.appendChild(description);
            beachDiv.appendChild(image);
        } else{
            citydisplay.forEach(city=>{
                const name = document.createElement('h3');
                name.textContent = city.name;
                beachDiv.appendChild(name);
                const description = document.createElement('p');
                description.textContent = city.description;
        
                const image = document.createElement('img');
                image.src = city.imageUrl;
                image.alt = city.name;
        
                beachDiv.appendChild(description);
                beachDiv.appendChild(image);
            })
        }
        beachContainer.appendChild(beachDiv);
    });
}
