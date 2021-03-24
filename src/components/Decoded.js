import React, { useContext } from 'react';

import { AppContext } from './context';

const Decoded = () => {

    const { message } = useContext(AppContext);

    let skyCondition = [];
    let time = message.time_of_obs.replace('T', ' at ').replace('Z', ' Zulu (UTC)');
    let gust, windDir;
    const gustExists = message.raw.match(/G\d+KT/);

    if (message.raw.includes('VRB')) {
        windDir = 'Variable'
    } else if (message.raw.includes('00000KT')) {
        windDir = 'Not Applicable (Calm)'
    } else if (message.raw.match(/\d{3}V\d{3}/)) {
        let windVarChar = message.raw.match(/\d{3}V\d{3}/)[0];
        windDir = `${message.wind} Degrees, variable from ${windVarChar[0]}${windVarChar[1]}${windVarChar[2]} to ${windVarChar[4]}${windVarChar[5]}${windVarChar[6]} Degrees`;
    } else {
        windDir = `${message.wind} Degrees`;
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

    if (message.sky_conditions[0].coverage === "CLR") {
        skyCondition = ['Clear'];
    } else {
        for (let i = 0; i < message.sky_conditions.length; i++) {
            let base = message.sky_conditions[i].base_agl;
            let coverage = message.sky_conditions[i].coverage;
            let condition = `${base} AGL${coverage}`;
            skyCondition.push(condition);
        }
    }

    return (
        <>
            <p className="station-id">Airport ID: {message.station_id}</p>
            <p className="time">Time of Observation: {time}</p>
            <p className="wind">Wind Direction / Speed: {windDir} / {message.wind_vel} {gust} Knots</p>
            <p className="visibility">Visibility: {message.visibility} Statute Miles</p>
            <p className="sky-condition">Sky Condition: {skyCondition.join(' - ').replace(/FEW/g, " Few").replace(/SCT/g, " Scattered").replace(/BKN/g, " Broken").replace(/OVC/g, " Overcast")}</p>
            <p className="temp-dewpoint">Temperature / Dewpoint: {message.temp}°C / {message.dewpoint}°C</p>
            <p className="altimeter-setting">Altimeter Setting: {message.alt_hg} inHg ({message.alt_mb} mb)</p>
        </>
    );

}

export default Decoded;
