const input = document.querySelector('input');
const button = document.querySelector('button');
const results = document.querySelector('.results');


button.addEventListener('click', () => {
    
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
    let time = data.time_of_obs.replace('T', ' ')
    let gust;
    let windDir;

    if (data.raw.includes('VRB')) {
        windDir = 'Variable'
    } else {
        windDir = `${data.wind} degrees`;
    }

    if (data.raw[18] === "G") {
        gust = `${data.raw[19]}${data.raw[20]} knots`;
    } else {
        gust = 'None';
    }

    if (data.sky_conditions[0].coverage === "CLR") {
        skyCondition = ['CLR'];
    } else {
        for (let i = 0; i < data.sky_conditions.length; i++) {
            let base = data.sky_conditions[i].base_agl;
            let coverage = data.sky_conditions[i].coverage;
            let condition = `${base}${coverage}`;
            skyCondition.push(condition);
        }
    }
    
    results.innerHTML = `
        <h4>METAR ${data.raw}</h4>
        <p>Airport ID: ${data.station_id}</p>
        <p>Time of Observation: ${time}</p>
        <p>Wind Direction: ${windDir}</p>
        <p>Wind Speed: ${data.wind_vel} knots</p>
        <p>Wind Gust: ${gust}</p>
        <p>Visibility: ${data.visibility} statute miles</p>
        <p>Sky Condition: ${skyCondition.join(' ')}</p>
        <p>Temperature: ${data.temp}°C</p>
        <p>Dewpoint: ${data.dewpoint}°C</p>
        <p>Altimeter Setting: ${data.alt_hg} inHg (${data.alt_mb} mb)</p>
    `;
    
    input.value = '';

    console.log(data);
}

function generateError(err) {
    if (err.toString().includes(404)) {
        results.innerHTML = `${err} - METAR not found for ${input.value}.`;
    } else {
    results.innerHTML = `${err}`;
    }
}