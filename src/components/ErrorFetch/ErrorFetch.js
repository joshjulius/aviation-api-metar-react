import React, { useContext } from 'react';
import styles from "./ErrorFetch.module.css";

import { AppContext } from '../context';

const ErrorFetch = () => {

    const { message, query } = useContext(AppContext);

    if (message.includes('404')) {
        return <p id={styles.errorMsg}>⚠️ {message} - No METAR found for {query}.</p>;
    } else {
        return <p id={styles.errorMsg}>⚠️ {message}.</p>;
    }

}

export default ErrorFetch;