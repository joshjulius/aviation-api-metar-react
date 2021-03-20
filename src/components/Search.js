import React, {useState} from 'react';

import FormValidation from './FormValidation';

const Search = (props) => {

    const [searchText, setSearchText] = useState('');
    const onSearchChange = (e) => {
        setSearchText(e.target.value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.checkFetch1(true);
        props.checkFetch2(true);
        props.onSearch(searchText);
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
                <FormValidation value={searchText.toUpperCase()} />
            </div>
            <button>Get weather information</button>
        </form>
    );
}

export default Search;