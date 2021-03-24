import React from 'react';


import Search from './Search';
import Results from './Results';

const Main = () => {

    return (
        <main>
            <div className="main-container">
                <Search />
                <Results />
            </div>
        </main>
    );
}

export default Main;