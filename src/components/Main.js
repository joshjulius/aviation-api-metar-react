import React from 'react';

import Search from './Search';
import Metar from './Metar';

const Main = () => {
    return (
        <main>
            <div className="main-container">
                <Search />
                <Metar />
            </div>
        </main>
    );
}

export default Main;