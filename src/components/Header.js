import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="header-container">
                <h1>METAR Decoder</h1>
                <p><span className="metar">METeorological Aerodome Reports</span> for US airports</p>
            </div>
        </header>
    );
}

export default Header;