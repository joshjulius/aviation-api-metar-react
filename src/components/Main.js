import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './Search';
import Results from './Results';

const Main = () => {

    const [data, setData] = useState(' ');
    const [airportName, setAirportName] = useState('');
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const [isFetching1, setIsFetching1] = useState(false);
    const [isFetching2, setIsFetching2] = useState(false);

    const performSearch = (value) => setQuery(value.toUpperCase());
    const checkFetch1 = (fetching) => setIsFetching1(fetching);
    const checkFetch2 = (fetching) => setIsFetching2(fetching);

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

    return (
        <main>
            <div className="main-container">
                <Search
                    onSearch={performSearch}
                    checkFetch1={checkFetch1}
                    checkFetch2={checkFetch2}
                />
                <Results
                    data={message}
                    icao={query}
                    airportName={airportName}
                />
            </div>
        </main>
    );
}

export default Main;