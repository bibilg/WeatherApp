const apiKey = '3e6a22803933489364840e4fc5bb1ef8';
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const logo = document.querySelector('.logo-meteo');

navigator.geolocation.getCurrentPosition( position => {
    
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    apiCall(latitude,longitude);

}, () => {
    alert('Vous devez accepter la géolocalisation');
    return;
})

function apiCall(latitude, longitude){

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`)
    .then((res) => {
        if(res.ok){
            return res.json();
        }
    })
    .then((value) => {

        editBlockInfo(value);
        
    })
    .catch(function(err){
        console.log('Erreur :' + err);
    })
}

function editBlockInfo(value){

    if( value.current.weather[0].icon.includes('d') ){
        logo.setAttribute('src',`./ressources/jour/${value.current.weather[0].icon}.svg`)
    }else{
        logo.setAttribute('src',`./ressources/nuit/${value.current.weather[0].icon}.svg`)
    }

    temps.innerText = value.current.weather[0].description;
    temperature.innerText = Math.round(value.current.temp) + '°';
    localisation.innerText = value.timezone;
}
