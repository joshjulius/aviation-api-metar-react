import React, { useContext } from 'react';

import { AppContext } from './context';
import Raw from './Raw';
import Decoded from './Decoded';

const Metar = () => {
    
    const { airportName } = useContext(AppContext);

    const highlight = (e) => {
        let hoverTarget = document.getElementsByClassName(e.target.className);
        for (let i = 0; i < hoverTarget.length; i++) {
            hoverTarget[i].classList.add('active');
        }
    }

    const removeHighlight = () => {
        let hasActive = document.querySelectorAll('.active');
        for (let i = 0; i < hasActive.length; i++) {
            hasActive[i].classList.remove('active');
        }
    }

    const addLabel = (e) => {
        let labelTarget = document.getElementsByClassName(e.target.className.split(' ')[0]);
        labelTarget[0].classList.add('label-sticker');
        labelTarget[1].classList.add('label-bold');
    
        let removeLabelFromSpan = document.querySelectorAll(`#raw-metar span:not(.${e.target.className.split(' ')[0]})`);
        let removeLabelFromP = document.querySelectorAll(`#decoded-metar p:not(.${e.target.className.split(' ')[0]})`);
        for (let i = 0; i < removeLabelFromSpan.length; i++) {
            removeLabelFromSpan[i].classList.remove('label-sticker');
        }
        for (let i = 0; i < removeLabelFromP.length; i++) {
            removeLabelFromP[i].classList.remove('label-bold');
        }
    }

    return (
        <>
            <div className="airport-name">
                {airportName}
            </div>
            <div id="results" onMouseOver={highlight} onMouseOut={removeHighlight} onClick={addLabel}>
                <div id="raw-metar">
                    <h4>
                        <Raw />
                    </h4>
                </div>
                <div id="decoded-metar">
                    <Decoded />
                </div>
            </div>
        </>
    );
}

export default Metar;