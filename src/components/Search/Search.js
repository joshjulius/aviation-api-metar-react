import React, { useContext } from 'react';
import styles from "./Search.module.css";

import { AppContext } from '../context';
import FormValidation from '../FormValidation/FormValidation';

const Search = () => {

    const { searchText, actions } = useContext(AppContext);

    return (
        <form onSubmit={actions.submit}>
            <input
                type="text"
                id="airport-code"
                placeholder="Enter ICAO Airport Code"
                maxLength="4"
                value={searchText.toUpperCase()}
                onChange={actions.searchChange}
            />
            <div className={styles.inputCheck}>
                <FormValidation />
            </div>
            <button>Get weather information</button>
        </form>
    );
}

export default Search;