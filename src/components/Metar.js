import React from 'react';

import Raw from './Raw';

const Metar = (props) => {

    console.log(props.data);

    return (
        <>
            <div className="airport-name">
            {props.airportName}
            </div>
            <div id="results">
                <div id="raw-metar">
                    <h4>
                        {/* <Raw data={props.data}/> */}
                    </h4>
                </div>
                <div id="decoded-metar">

                </div>
            </div>
        </>
    );
}

export default Metar;