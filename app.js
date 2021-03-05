const form = document.querySelector('form');
const input = document.querySelector('input');
const results = document.querySelector('.results');
// let decode = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const query = input.value.toUpperCase();
    
    fetch(`https://api.aviationapi.com/v1/weather/metar?apt=${query}`)
        .then(checkStatus)
        .then(res => res.json())
        .then(data => generateHTML(data[query]))
        .catch(err => generateError(err));
});

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(`${response.status} ${response.statusText}`))
    }
}

function generateHTML(data) {
    let skyCondition = [];
    let time = data.time_of_obs.replace('T', ' ').replace('Z', ' UTC');
    let gust, windDir;
    const gustExists = data.raw.match(/G\d+KT/);

    // check for AUTO

    if (data.raw.includes('VRB')) {
        windDir = 'Variable'
    } else if (data.raw.includes('00000KT')) {
        windDir = 'Not Applicable (Calm)'
    } else {
        windDir = `${data.wind} degrees`;
    }

    if (gustExists) {
        gust = `${gustExists[0][1]}${gustExists[0][2]} knots`;
    } else {
        gust = 'None';
    }

    // check for rn sn br fg etc.

    if (data.sky_conditions[0].coverage === "CLR") {
        skyCondition = ['Clear'];
    } else {
        for (let i = 0; i < data.sky_conditions.length; i++) {
            let base = data.sky_conditions[i].base_agl;
            let coverage = data.sky_conditions[i].coverage;
            let condition = `${base} AGL${coverage}`;
            skyCondition.push(condition);
        }
    }

    // remarks
    
    input.value = '';

    console.log(data);

    // function checkMatch() {
    //     const metar = data.raw.split(/[^A-Z]/g);
    //     for (let i = 0 ; i < abbreviations.length; i++) {
    //         if (metar.includes(abbreviations[i])) {
    //             decode.push(meaning[abbreviations[i]]);
    //         }
    //     }
    //     console.log(metar);
    //     console.log(decode);
    // }
    // checkMatch();

    results.innerHTML = `
        <h4>METAR ${data.raw}</h4>
        <p>Airport ID: ${data.station_id}</p>
        <p>Time of Observation: ${time}</p>
        <p>Wind Direction: ${windDir}</p>
        <p>Wind Speed: ${data.wind_vel} knots</p>
        <p>Wind Gust: ${gust}</p>
        <p>Visibility: ${data.visibility} statute miles</p>
        <p>Sky Condition: ${skyCondition.join(' / ').replace('FEW', ' few').replace('SCT', ' scattered').replace('BKN', ' broken').replace('OVC', ' overcast')}</p>
        <p>Temperature: ${data.temp}°C</p>
        <p>Dewpoint: ${data.dewpoint}°C</p>
        <p>Altimeter Setting: ${data.alt_hg} inHg (${data.alt_mb} mb)</p>
    `;
    
    
}

function generateError(err) {
    if (err.toString().includes(404)) {
        results.innerHTML = `${err} - METAR not found for ${input.value}.`;
    } else {
    results.innerHTML = `${err}`;
    }
}

// results.addEventListener('mouseover', (e) => {
//     if (e.target.tagName == 'H4') {
//         e.target.style.color = 'tomato';
//     }
// });

// results.addEventListener('mouseout', (e) => {
//     if (e.target.tagName == 'H4') {
//         e.target.style.color = 'white';
//     }
// });