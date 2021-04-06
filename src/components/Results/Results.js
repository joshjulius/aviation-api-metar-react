import React, { useContext } from 'react';

import { AppContext } from '../context';
import Metar from '../Metar/Metar';
import Loading from '../Loading/Loading';
import ErrorFetch from '../ErrorFetch/ErrorFetch'

const Results = () => {

    const { message } = useContext(AppContext);

    if (message === '') {
        return(null);
    } else if (message === 'Loading...') {
        return (
            <Loading />
        );
    } else if (message.toString().includes('Error')) {
        return (
            <ErrorFetch />
            );
    } else {
        return (
            <Metar />
        );
    }
    

}

export default Results