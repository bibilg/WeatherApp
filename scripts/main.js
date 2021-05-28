import bonjour from './Utilitaire/gestionTemps.js';

const apiKey = '3e6a22803933489364840e4fc5bb1ef8';
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const logo = document.querySelector('.logo-meteo');
const heure = document.querySelectorAll('.h-nom-prevision');
const heurePrevision = document.querySelectorAll('.h-prevision-valeur');
const jours = document.querySelectorAll('.j-nom-prevision');
const joursPrevision = document.querySelectorAll('.j-prevision-valeur');
const days = [ 'Dim' , 'Lun' , 'Mar' , 'Mer' , 'Jeu' , 'Ven' , 'Sam'];

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
        editPrevisionHeure(value);
        editPrevisionJour(value);
        console.log(bonjour);
        
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

function editPrevisionHeure(value){

    let date = new Date();
    let hours = date.getHours();

    for( let i = 0, j=0 ; i < heure.length ; i++ , j+=3, hours+=3 ){

        if(hours >= 24){
            hours -=24;
        }

        heure[i].innerText = hours + 'h';
        heurePrevision[i].innerText = Math.round(value.hourly[j].temp) + '°';
    }
}

function editPrevisionJour(value){

    let date = new Date();
    let jour = date.getDay();

    for( let i = 0 ; i < jours.length ; i++, jour++ ){

        if(jour === 7){
            jour = 0;
        }

        jours[i].innerText = days[jour];
        joursPrevision[i].innerText = Math.round(value.daily[i].temp.day) + '°';
    }
}
