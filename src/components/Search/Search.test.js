import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import axiosMock from 'axios';
import { Provider } from '../context';
import Search from './Search.js';

afterEach(cleanup);

describe('<Search />', () => {
    
    it('renders without crashing', () => {
        render (
            <Provider>
                <Search />
            </Provider>
        );
    });
    
    it('coverts input value to uppercase and clears upon submit', () => {
        const { getByLabelText, getByTitle } = render(
            <Provider>
                <Search />
            </Provider>
        );
        const input = getByLabelText('input-icao-airport-code');
        expect(input.value).toBe('');
        fireEvent.change(input, { target: { value: 'klax' } });
        expect(input.value).toBe('KLAX');
        fireEvent.submit(getByTitle('form'));
        expect(input.value).toBe('');
    });

    it('verifies input', () => {
        const { getByLabelText, getByText, getByTitle } = render(
            <Provider>
                <Search />
            </Provider>
        );
        const input = getByLabelText('input-icao-airport-code');
        fireEvent.change(input, { target: { value: 'kz' } });
        getByText('✏️ KZ');
        fireEvent.change(input, { target: { value: 'q' } });
        getByText('❌ US ICAO airport codes begin with K, N, P, or T.');
        fireEvent.change(input, { target: { value: '1' } });
        getByText('❌ Please enter alphabet characters only.');
        fireEvent.change(input, { target: { value: '[' } });
        getByText('❌ Please enter alphabet characters only.');
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.submit(getByTitle('form'));
        getByText('☝️ Please enter an airport.');
        fireEvent.change(input, { target: { value: 'lgs' } });
        fireEvent.submit(getByTitle('form'));
        getByText('❌ ICAO airport codes are 4 characters long.');
    });

    it('fetches and displays data', async () => {
        axiosMock.get.mockResolvedValueOnce(
            {
                data:
                {
                    KLAS:
                    {
                        0:
                        {
                            city: 'LAS VEGAS',
                            facility_name: 'MC CARRAN INTL'
                        }
                    }
                }
            }
        );
        
        const { getByLabelText, getByText, findByText } = render(
            <Provider>
                <Search />
            </Provider>
        );
        const input = getByLabelText('input-icao-airport-code');
        fireEvent.change(input, { target: { value: 'klas' } });
        getByText('✏️ KLAS - Checking...');
        await findByText('✔️ MC CARRAN INTL - LAS VEGAS');
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
    });

    it('verifies that an airport code does not match', async () => {
        axiosMock.get.mockRejectedValueOnce(new Error('TypeError'));
        
        const { getByLabelText, getByText, findByText } = render(
            <Provider>
                <Search />
            </Provider>
        );
        const input = getByLabelText('input-icao-airport-code');
        fireEvent.change(input, { target: { value: 'klmn' } });
        getByText('✏️ KLMN - Checking...');
        await findByText('❌ KLMN does not match any US ICAO airport code.');
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
    });

    it('is unable to validate due to network error', async () => {
        axiosMock.get.mockRejectedValueOnce(new Error('Network Error'));
        
        const { getByLabelText, getByText, findByText } = render(
            <Provider>
                <Search />
            </Provider>
        );
        const input = getByLabelText('input-icao-airport-code');
        fireEvent.change(input, { target: { value: 'ksea' } });
        getByText('✏️ KSEA - Checking...');
        await findByText('❌ Unable to validate - Error: Network Error');
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
    });

});