const form = document.querySelector('form');
const input = document.querySelector('input');
const inputCheck = document.querySelector('.input-check');
const results = document.querySelector('.results');
// let decode = [];

input.addEventListener('input', (e) => {
    const query = input.value.toUpperCase();
    inputCheck.style.display = 'inline';
    if (input.value.length === 4) {
        fetch(`https://api.aviationapi.com/v1/airports?apt=${query}`)
            .then(checkStatus)    
            .then(res => res.json())
            .then(data => generateAirportName(data[query][0].facility_name))
            .catch(generateErrorInput());
    } else if (input.value.length === 0) {
        inputCheck.style.display = 'none';
    } else {
        inputCheck.innerHTML = `<span class="airport-name-invalid">❌ ${e.target.value} does not match any US airport ICAO codes.</span>`;
    }
});

form.addEventListener('submit', (e) => {
    const query = input.value.toUpperCase();
    e.preventDefault();
    fetch(`https://api.aviationapi.com/v1/weather/metar?apt=${query}`)
        .then(checkStatus)
        .then(res => res.json())
        .then(data => generateHTML(data[query]))
        .catch(err => generateErrorSubmit(err));
});

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(`${response.status} ${response.statusText}`))
    }
}

function generateAirportName(airport) {
    inputCheck.innerHTML = `<span class="airport-name-valid">✔️ ${airport}</span>`;
}

function generateHTML(data) {
    let skyCondition = [];
    let time = data.time_of_obs.replace('T', ' at ').replace('Z', ' Zulu (UTC)');
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
    inputCheck.style.display = 'none';
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

function generateErrorInput() {
    inputCheck.innerHTML = `<span class="airport-name-invalid">❌ ${input.value} does not match any US airport ICAO codes.</span>`;
}

function generateErrorSubmit(err) {
    if (input.value.length === 0) {
        inputCheck.style.display = 'inline';
        inputCheck.innerHTML = `<span class="airport-name-invalid">☝️ Please enter an airport.</span>`;
    }

    if (err.toString().includes(404)) {
        results.innerHTML = `<p class="error-msg">⚠️ ${err} - No METAR found for ${input.value}.</p>`;
    } else {
        results.innerHTML = `<p class="error-msg">⚠️ ${err}</p>`;
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