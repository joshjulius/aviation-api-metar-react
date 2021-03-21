import React from 'react';

import Validated from './Validated';

const FormValidation = (props) => {

    if (props.value === '') {
        return props.error;
    } else if (props.value.match(/[^A-Za-z]/)) {
        return (
            <span className="form-invalid">❌ Please enter alphabet characters only.</span>
        );
    } else if (!props.value.startsWith('K') && !props.value.startsWith('N') && !props.value.startsWith('P') && !props.value.startsWith('T')) {
        return(
            <span className="form-invalid">❌ US ICAO airport codes begin with K, N, P, or T.</span>
        );
    } else if (props.value.length === 4) {
        return <Validated
                    value={props.value}
                />;    
    } else {
        return (
            <span className="form-typing">✏️ {props.value}</span>
        );
    }

}

export default FormValidation;