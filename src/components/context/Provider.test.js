import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import axiosMock from 'axios';
import { Provider } from './index';
import Main from '../Main';

afterEach(cleanup);

it('fetches and displays metar', async () => {
    axiosMock.get.mockResolvedValueOnce(
        {
            data:
            {
                PANC:
                {
                    alt_hg: "29.91",
                    alt_mb: "1013.1",
                    auto_report: "true",
                    category: "VFR",
                    dewpoint: "-2.2",
                    raw: "PANC 130453Z 15016G25KT 10SM SCT065 BKN090 OVC110 04/M02 A2991 RMK AO2 PK WND 16037/0408 SLP131 SH DSNT W-N T00391022",
                    report_type: "METAR",
                    sky_conditions: 
                    {
                        0: {coverage: "SCT", base_agl: "6500"},
                        1: {coverage: "BKN", base_agl: "9000"},
                        2: {coverage: "OVC", base_agl: "11000"}
                    },
                    station_id: "PANC",
                    temp: "3.9",
                    time_of_obs: "2021-04-13T04:53:00Z",
                    visibility: "10.0",
                    wind: "150",
                    wind_vel: "16",
                    wx: null
                }
            }
        }
    );

    const { getByLabelText, getByTitle, findByText } = render(
        <Provider>
            <Main />
        </Provider>
    );
    const input = getByLabelText('input-icao-airport-code');
    fireEvent.change(input, { target: { value: 'PANC' } });
    fireEvent.submit(getByTitle('form'));
    await findByText('PANC');
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
});