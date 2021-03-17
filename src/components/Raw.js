import React from 'react';

const Raw = (props) => {

    function addSpan(data) {
        const windSpace = data.raw.match(/\d{5}G?\d?\d?KT(.?\d{3}V\d{3})?/g).join(' ');
        const windNoSpace = data.raw.match(/\d{5}G?\d?\d?KT(.?\d{3}V\d{3})?/g).join().replace(' ', '-');
        const skyConditionSpace = data.raw.match(/(CLR|FEW|SCT|BKN|OVC)(\d?){3}/g).join(' ');
        const skyConditionNoSpace = data.raw.match(/(CLR|FEW|SCT|BKN|OVC)(\d?){3}/g).join('-').toString();
        let metarItems = data.raw.replace(windSpace, windNoSpace).replace(skyConditionSpace, skyConditionNoSpace).split(' ');

        const spanned = metarItems.map(item => {
            if (item === data.station_id) {
                return (<span className="station-id">{item}&nbsp;</span>);
            } else if (item.match(/\d{6}Z/)) {
                return (<span className="time">{item}&nbsp;</span>);
            } else if (item.match(/\d{5}G?\d?\d?KT(.?\d{3}V\d{3})?/g)) {
                return (<span className="wind">{item.replace(/-/g, ' ')}&nbsp;</span>);
            } else if (item.match(/\d+SM/)) {
                return (<span className="visibility">{item}&nbsp;</span>);
            } else if (item.startsWith('CLR') || item.startsWith('FEW') || item.startsWith('SCT') || item.startsWith('BKN') || item.startsWith('OVC')) {
                return (<span className="sky-condition">{item.replace(/-/g,' ')}&nbsp;</span>);
            } else if (item.match(/^M?\d{2}\/M?\d{2}$/)) {
                return (<span className="temp-dewpoint">{item}&nbsp;</span>);
            } else if (item.match(/A\d{4}/)) {
                return (<span className="altimeter-setting">{item}&nbsp;</span>);
            }  else {
                return (<span>{item}&nbsp;</span>);
            }
        });

        return spanned;
    }

    return (
        addSpan(props.data)
    );

}

export default Raw;