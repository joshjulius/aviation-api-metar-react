import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = React.createContext();

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

            axios.get(metarURL)
                .then(
                    (res) => {
                        setError('');
                        setData(res.data[query]);
                        setIsFetching1(false);
                    },
                    (error) => {
                        setError(error.toString());
                        setData('');
                        setIsFetching1(false);
                    }
                    );

            axios.get(airportNameURL)  
            //SERVER ONLY RETURNS response: ok and status: 200
                .then(data => {
                    if (data.data[query].length !== 0) {
                        setAirportName(<p>{data.data[query][0].facility_name}, {data.data[query][0].city}</p>);
                    }
                    setIsFetching2(false);
                })

        } else {
            setAirportName(null);
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
            setErrorMessage(<span className="form-invalid">☝️ Please enter an airport.</span>);
        } else {
            setErrorMessage('');
        }
        performSearch(searchText);
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