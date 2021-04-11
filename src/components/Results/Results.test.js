import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from '../context';
import Results from './Results';

describe('<Results />', () => {
    it('renders without crashing', () => {
        render (
            <Provider>
                <Results />
            </Provider>
        );
    });
});