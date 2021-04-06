import React from 'react';
import styles from "./Header.module.css";

const Header = () => {
    return (
        <header>
            <div className={styles.headerContainer}>
                <h1>METAR Decoder</h1>
                <p><span className="metar">METeorological Aerodome Reports</span> for US airports</p>
            </div>
        </header>
    );
}

export default Header;