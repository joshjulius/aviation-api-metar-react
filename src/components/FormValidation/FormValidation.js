import React, { useContext } from 'react';
import styles from "./FormValidation.module.css";

import { AppContext } from '../context';
import Validated from '../Validated/Validated';

const FormValidation = () => {

    const { searchText, errorMessage } = useContext(AppContext);
    const searchTextUpper = searchText.toUpperCase();

    if (searchTextUpper === '') {
        return errorMessage;
    } else if (searchTextUpper.match(/[^A-Za-z]/)) {
        return (
            <span className={styles.formInvalid}>❌ Please enter alphabet characters only.</span>
        );
    } else if (!searchTextUpper.startsWith('K') && !searchTextUpper.startsWith('N') && !searchTextUpper.startsWith('P') && !searchTextUpper.startsWith('T')) {
        return(
            <span className={styles.formInvalid}>❌ US ICAO airport codes begin with K, N, P, or T.</span>
        );
    } else if (searchTextUpper.length === 4) {
        return <Validated
                    value={searchTextUpper}
                />;    
    } else {
        return (
            <span className={styles.formTyping}>✏️ {searchTextUpper}</span>
        );
    }

}

export default FormValidation;