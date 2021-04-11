import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from '../context';
import ErrorFetch from './ErrorFetch';

describe('<ErrorFetch />', () => {
    it('renders without crashing', () => {
        render (
            <Provider>
                <ErrorFetch />
            </Provider>
        );
    });
});