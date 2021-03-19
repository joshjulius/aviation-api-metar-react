import React from 'react';

const ErrorFetch = (props) => {

    if (props.data.includes('404')) {
        return <p id="error-msg">⚠️ {props.data} - No METAR found for {props.icao}.</p>;
    } else {
        return <p id="error-msg">⚠️ {props.data}.</p>;
    }

}

export default ErrorFetch;