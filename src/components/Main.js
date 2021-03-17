import React, { useState, useEffect } from 'react';

import Search from './Search';
import Metar from './Metar';

const Main = () => {

    const [data, setData] = useState('');
    const [airportName, setAirportName] = useState('');
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);
    const [isSearched, setIsSearched] = useState(false);

    const performSearch = (value) => setQuery(value);

    useEffect(() => {
        if (query !== '') {
            fetch(`https://api.aviationapi.com/v1/weather/metar?apt=${query}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsSearched(true);
                        setData(result[query]);
                    },
                    (error) => {
                        setIsSearched(true);
                        setError(error);
                    }
                )
            fetch(`https://api.aviationapi.com/v1/airports?apt=${query}`)  
            //SERVER ONLY RETURNS response: ok and status: 200
                .then(res => res.json())
                .then(data => setAirportName(<p>{data[query][0].facility_name}, {data[query][0].city}</p>))
        }
    }, [query]);

    let message;
    if (error) {
        message = error.message;
    } else if (!isSearched) {
        message = "";
    } else {
        message = data;
    }

    return (
        <main>
            <div className="main-container">
                <Search onSearch={performSearch}/>
                <Metar
                    data={message}
                    airportName={airportName}
                />
            </div>
        </main>
    );
}

export default Main;