import React, { useContext } from 'react';

import { AppContext } from './context';

const ErrorFetch = () => {

    const { message, query } = useContext(AppContext);

    if (message.includes('404')) {
        return <p id="error-msg">⚠️ {message} - No METAR found for {query}.</p>;
    } else {
        return <p id="error-msg">⚠️ {message}.</p>;
    }

}

export default ErrorFetch;