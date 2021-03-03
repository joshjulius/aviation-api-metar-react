const root = document.getElementById('root');
const input = document.querySelector('input');
const button = document.querySelector('button');
const results = document.querySelector('.results');

button.addEventListener('click', () => {
    const query = input.value.toUpperCase();
    fetch(`https://api.aviationapi.com/v1/weather/metar?apt=${query}`)
        .then(res => res.json())
        .then(data => generateHTML(data[query]))
        .catch(generateError());
});

function generateHTML(data) {
    let skyCondition = [];
    let time = data.time_of_obs.replace('T', ' ')

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
        <p>Station ID: ${data.station_id}</p>
        <p>Time of Observation: ${time}</p>
        <p>Wind Direction: ${data.wind} degrees</p>
        <p>Wind Speed: ${data.wind_vel} knots</p>
        <p>Visibility: ${data.visibility} statute miles</p>
        <p>Sky Condition: ${skyCondition.join(' ')}</p>
        <p>Temperature: ${data.temp}°C</p>
        <p>Dewpoint: ${data.dewpoint}°C</p>
        <p>Altimeter Setting: ${data.alt_hg} inHg (${data.alt_mb} mb)</p>
    `;
    
}
    
function generateError() {
    results.innerHTML = `
        <h4>No METAR found for ${input.value}.</h4>
    `;
}