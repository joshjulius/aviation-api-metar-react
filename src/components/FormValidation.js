import React, { useContext } from 'react';

import { AppContext } from './context';
import Validated from './Validated';

const FormValidation = () => {

    const { searchText, errorMessage } = useContext(AppContext);
    const searchTextUpper = searchText.toUpperCase();

    if (searchTextUpper === '') {
        return errorMessage;
    } else if (searchTextUpper.match(/[^A-Za-z]/)) {
        return (
            <span className="form-invalid">❌ Please enter alphabet characters only.</span>
        );
    } else if (!searchTextUpper.startsWith('K') && !searchTextUpper.startsWith('N') && !searchTextUpper.startsWith('P') && !searchTextUpper.startsWith('T')) {
        return(
            <span className="form-invalid">❌ US ICAO airport codes begin with K, N, P, or T.</span>
        );
    } else if (searchTextUpper.length === 4) {
        return <Validated
                    value={searchTextUpper}
                />;    
    } else {
        return (
            <span className="form-typing">✏️ {searchTextUpper}</span>
        );
    }

}

export default FormValidation;