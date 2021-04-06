import React from 'react';
import styles from "./Main.module.css";

import Search from '../Search/Search';
import Results from '../Results/Results';

const Main = () => {

    return (
        <main>
            <div className={styles.mainContainer}>
                <Search />
                <Results />
            </div>
        </main>
    );
}

export default Main;