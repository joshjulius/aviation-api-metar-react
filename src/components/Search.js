import React, {useState} from 'react';

const Search = (props) => {

    const [searchText, setSearchText] = useState('');
    const onSearchChange = (e) => setSearchText(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.checkFetch1(true);
        props.checkFetch2(true);
        props.onSearch(searchText);
        e.currentTarget.reset();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="airport-code"
                placeholder="Enter ICAO Airport Code"
                maxLength="4"
                onChange={onSearchChange}
                value={searchText.toUpperCase()}
            />
            <div className="input-check">
          
            </div>
            <button>Get weather information</button>
        </form>
    );
}

export default Search;