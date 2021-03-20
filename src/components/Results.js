import React from 'react';

import Metar from './Metar';
import Loading from './Loading';
import ErrorFetch from './ErrorFetch'

const Results = (props) => {

    if (props.data === '') {
        return(null);
    } else if (props.data === 'Loading...') {
        return (
            <Loading data={props.data} />
        );
    } else if (props.data.toString().includes('Error')) {
        return (
            <ErrorFetch
                data={props.data}
                icao={props.icao}
            />
            );
    } else {
        return (
            <Metar
                data={props.data}
                airportName={props.airportName}
            />
        );
    }
    

}

export default Results