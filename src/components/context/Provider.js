import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from './context.js';

import styles from "./Provider.module.css";

export const Provider = (props) => {
    const [data, setData] = useState(' ');
    const [airportName, setAirportName] = useState('');
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const [isFetching1, setIsFetching1] = useState(false);
    const [isFetching2, setIsFetching2] = useState(false);

    const performSearch = value => setQuery(value.toUpperCase());
    const checkFetch1 = fetching => setIsFetching1(fetching);
    const checkFetch2 = fetching => setIsFetching2(fetching);

    useEffect(() => {

        const metarURL = `https://cors.bridged.cc/https://api.aviationapi.com/v1/weather/metar?apt=${query};`
        const airportNameURL = `https://cors.bridged.cc/https://api.aviationapi.com/v1/airports?apt=${query};`

        if (query !== '') {

            const fetchMetar = async () => {
                try {
                    const metar = await axios.get(metarURL);
                    console.log(metar);
                    setError('');
                    const metarJSON = metar.data[query];
                    setData(metarJSON);
                    setIsFetching1(false);
                } catch (err) {
                    setError(err.toString());
                    setData('');
                    setIsFetching1(false);
                }
            }

            fetchMetar();
            
            const fetchAirportName = async () => {
                try {
                    const airportName = await axios.get(airportNameURL);
                    if (airportName.data[query].length !== 0) {
                        setAirportName(<p>{airportName.data[query][0].facility_name}, {airportName.data[query][0].city}</p>);
                    }
                    setIsFetching2(false);
                } catch {
                    // server only returns status: 200 AND response: ok
                }
            }
        
            fetchAirportName();

        } else {
            setAirportName(null);
            setIsFetching1(false);
            setIsFetching2(false);
        }

    }, [query]);

    let message;
    if (query === '') {
        message = '';
    } else if (error.toString().includes('Error')) {
        message = error
    } else if (isFetching1 || isFetching2) {
        message = "Loading...";
    } else {
        message = data;
    }
    

    const [searchText, setSearchText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const onSearchChange = e => {
        setSearchText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        checkFetch1(true);
        checkFetch2(true);
        if (searchText === '') {
            setErrorMessage(<span className={styles.formInvalid}>☝️ Please enter an airport.</span>);
            setQuery('');
        } else if (searchText.length === 1 || searchText.length === 2 || searchText.length === 3 ) {
            setErrorMessage(<span className={styles.formInvalid}>❌ ICAO airport codes are 4 characters long.</span>);
            setQuery('');
        } else {
            setErrorMessage('');
            performSearch(searchText);
        }
        setSearchText('');
    }

    return (
        <AppContext.Provider value={{
            airportName,
            query,
            message,
            searchText,
            errorMessage,
            actions: {
                submit: handleSubmit,
                searchChange: onSearchChange
            }
        }}>
        { props.children }
        </AppContext.Provider>
    );
}