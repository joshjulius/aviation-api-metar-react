import React, { useContext } from 'react';
import styles from "./Raw.module.css";

import { AppContext } from '../context';

const Raw = (props) => {

    const { message } = useContext(AppContext);

    function addSpan(data) {
        const windSpace = data.raw.match(/(\d{5}|VRB\d{2})G?\d?\d?KT(.?\d{3}V\d{3})?/g).join(' ');
        const windNoSpace = data.raw.match(/(\d{5}|VRB\d{2})G?\d?\d?KT(.?\d{3}V\d{3})?/g).join().replace(' ', '-');
        const skyConditionSpace = data.raw.match(/(CLR|FEW|SCT|BKN|OVC)(\d?){3}/g).join(' ');
        const skyConditionNoSpace = data.raw.match(/(CLR|FEW|SCT|BKN|OVC)(\d?){3}/g).join('-').toString();
        let metarItems = data.raw.replace(windSpace, windNoSpace).replace(skyConditionSpace, skyConditionNoSpace).split(' ');

        const spanned = metarItems.map(item => {
            if (item === data.station_id) {
                return <span className="station-id" onMouseOver={props.highlight} onMouseOut={props.removeHighlight} onClick={props.addLabel}>{item} </span>
            } else if (item.match(/\d{6}Z/)) {
                return (<span className="time" onMouseOver={props.highlight} onMouseOut={props.removeHighlight} onClick={props.addLabel}>{item} </span>);
            } else if (item.match(/(\d{5}|VRB\d{2})G?\d?\d?KT(.?\d{3}V\d{3})?/g)) {
                return (<span className="wind" onMouseOver={props.highlight} onMouseOut={props.removeHighlight} onClick={props.addLabel}>{item.replace(/-/g, ' ')} </span>);
            } else if (item.match(/\d+SM/)) {
                return (<span className="visibility" onMouseOver={props.highlight} onMouseOut={props.removeHighlight} onClick={props.addLabel}>{item} </span>);
            } else if (item.startsWith('CLR') || item.startsWith('FEW') || item.startsWith('SCT') || item.startsWith('BKN') || item.startsWith('OVC')) {
                return (<span className="sky-condition" onMouseOver={props.highlight} onMouseOut={props.removeHighlight} onClick={props.addLabel}>{item.replace(/-/g,' ')} </span>);
            } else if (item.match(/^M?\d{2}\/M?\d{2}$/)) {
                return (<span className="temp-dewpoint" onMouseOver={props.highlight} onMouseOut={props.removeHighlight} onClick={props.addLabel}>{item} </span>);
            } else if (item.match(/A\d{4}/)) {
                return (<span className="altimeter-setting" onMouseOver={props.highlight} onMouseOut={props.removeHighlight} onClick={props.addLabel}>{item} </span>);
            }  else {
                return (<span>{item} </span>);
            }
        });

        return spanned;
    }

    return (
        addSpan(message)
    );

}

export default Raw;