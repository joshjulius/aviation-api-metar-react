import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from '../context';
import Search from './Search';
import FormValidation from '../FormValidation/FormValidation';

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
        const { getByLabelText, getByText } = render(
            <Provider>
                <Search />
            </Provider>
        );
        const input = getByLabelText('input-icao-airport-code');
        fireEvent.change(input, { target: { value: 'kz' } });
        getByText('✏️ KZ');
    });

});