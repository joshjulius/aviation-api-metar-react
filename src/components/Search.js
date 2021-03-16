import React from 'react';

const Search = () => {
    return (
        <form>
            <input type="text" id="airport-code" placeholder="Enter ICAO Airport Code" maxLength="4" />
            <div className="input-check">
          
            </div>
            <button>Get weather information</button>
        </form>
    );
}

export default Search;