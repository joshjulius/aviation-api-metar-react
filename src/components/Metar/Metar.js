import React, { useContext } from 'react';
import styles from "./Metar.module.css";

import { AppContext } from '../context';
import Raw from '../Raw/Raw';
import Decoded from '../Decoded/Decoded';

const Metar = () => {
    
    const { airportName } = useContext(AppContext);

    const highlight = (e) => {
        let hoverTarget = document.getElementsByClassName(e.target.className);
        for (let i = 0; i < hoverTarget.length; i++) {
            hoverTarget[i].classList.add(`${styles.active}`);
        }
    }

    const removeHighlight = () => {
        let hasActive = document.querySelectorAll(`.Metar_active__1vhsW`);
        for (let i = 0; i < hasActive.length; i++) {
            hasActive[i].classList.remove(`${styles.active}`);
        }
    }

    const addLabel = (e) => {
        let labelTarget = document.getElementsByClassName(e.target.className.split(' ')[0]);
        labelTarget[0].classList.add(`${styles.labelSticker}`);
        labelTarget[1].classList.add(`${styles.labelBold}`);
    
        let removeLabelFromSpan = document.querySelectorAll(`#Metar_rawMetar__2eBst span:not(.${e.target.className.split(' ')[0]})`);
        let removeLabelFromP = document.querySelectorAll(`#Metar_decodedMetar__x17rk p:not(.${e.target.className.split(' ')[0]})`);
        for (let i = 0; i < removeLabelFromSpan.length; i++) {
            removeLabelFromSpan[i].classList.remove(`${styles.labelSticker}`);
        }
        for (let i = 0; i < removeLabelFromP.length; i++) {
            removeLabelFromP[i].classList.remove(`${styles.labelBold}`);
        }
    }

    return (
        <>
            <div className={styles.airportName}>
                {airportName}
            </div>
            <div id="results" onMouseOver={highlight} onMouseOut={removeHighlight} onClick={addLabel}>
                <div id={styles.rawMetar}>
                    <h4>
                        <Raw />
                    </h4>
                </div>
                <div id={styles.decodedMetar}>
                    <Decoded />
                </div>
            </div>
        </>
    );
}

export default Metar;