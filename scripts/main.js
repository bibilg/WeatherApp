const apiKey = '3e6a22803933489364840e4fc5bb1ef8';

navigator.geolocation.getCurrentPosition( position => {
    
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    apiCall(latitude,longitude);

}, () => {
    alert('Vous devez accpeter la géolocalisation');
    return;
})

function apiCall(latitude, longitude){

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${apiKey}`)
    .then((res) => {
        if(res.ok){
            return res.json();
        }
    })
    .then((value) => {
        console.log(value);
    })
    .catch(function(err){
        console.log('Erreur :' + err);
    })
}
