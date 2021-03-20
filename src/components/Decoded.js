import React from 'react';

const Decoded = (props) => {

    console.log(props.data);

    let skyCondition = [];
    let time = props.data.time_of_obs.replace('T', ' at ').replace('Z', ' Zulu (UTC)');
    let gust, windDir;
    const gustExists = props.data.raw.match(/G\d+KT/);

    if (props.data.raw.includes('VRB')) {
        windDir = 'Variable'
    } else if (props.data.raw.includes('00000KT')) {
        windDir = 'Not Applicable (Calm)'
    } else if (props.data.raw.match(/\d{3}V\d{3}/)) {
        let windVarChar = props.data.raw.match(/\d{3}V\d{3}/)[0];
        windDir = `${props.data.wind} Degrees, variable from ${windVarChar[0]}${windVarChar[1]}${windVarChar[2]} to ${windVarChar[4]}${windVarChar[5]}${windVarChar[6]} Degrees`;
    } else {
        windDir = `${props.data.wind} Degrees`;
    }

    if (gustExists) {
        if (gustExists[0][1] === '0') {
        gust = `Gusting to ${gustExists[0][2]}`;
        } else {
        gust = `Gusting to ${gustExists[0][1]}${gustExists[0][2]}`; 
        }
    } else {
        gust = '';
    }

    if (props.data.sky_conditions[0].coverage === "CLR") {
        skyCondition = ['Clear'];
    } else {
        for (let i = 0; i < props.data.sky_conditions.length; i++) {
            let base = props.data.sky_conditions[i].base_agl;
            let coverage = props.data.sky_conditions[i].coverage;
            let condition = `${base} AGL${coverage}`;
            skyCondition.push(condition);
        }
    }

    return (
        <>
            <p className="station-id">Airport ID: {props.data.station_id}</p>
            <p className="time">Time of Observation: {time}</p>
            <p className="wind">Wind Direction / Speed: {windDir} / {props.data.wind_vel} {gust} Knots</p>
            <p className="visibility">Visibility: {props.data.visibility} Statute Miles</p>
            <p className="sky-condition">Sky Condition: {skyCondition.join(' - ').replace(/FEW/g, " Few").replace(/SCT/g, " Scattered").replace(/BKN/g, " Broken").replace(/OVC/g, " Overcast")}</p>
            <p className="temp-dewpoint">Temperature / Dewpoint: {props.data.temp}°C / {props.data.dewpoint}°C</p>
            <p className="altimeter-setting">Altimeter Setting: {props.data.alt_hg} inHg ({props.data.alt_mb} mb)</p>
        </>
    );

}

export default Decoded;
