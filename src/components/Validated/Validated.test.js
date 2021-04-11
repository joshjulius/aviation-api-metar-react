import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from '../context';
import Validated from './Validated';

describe('<Validated />', () => {
    it('renders without crashing', () => {
        render (
            <Provider>
                <Validated />
            </Provider>
        );
    });
});