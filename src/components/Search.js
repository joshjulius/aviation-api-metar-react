import React, { useState, useContext } from 'react';

import { AppContext } from './context';
import FormValidation from './FormValidation';

const Search = () => {

    const { actions } = useContext(AppContext);

    const [searchText, setSearchText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const onSearchChange = (e) => {
        setSearchText(e.target.value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.isFetched1(true);
        actions.isFetched2(true);
        if (searchText === '') {
            setErrorMessage(<span className="form-invalid">☝️ Please enter an airport.</span>);
        } else {
            setErrorMessage('');
        }
        actions.onSearch(searchText);
        setSearchText('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="airport-code"
                placeholder="Enter ICAO Airport Code"
                maxLength="4"
                value={searchText.toUpperCase()}
                onChange={onSearchChange}
            />
            <div className="input-check">
                <FormValidation
                    value={searchText.toUpperCase()}
                    error={errorMessage}
                />
            </div>
            <button>Get weather information</button>
        </form>
    );
}

export default Search;