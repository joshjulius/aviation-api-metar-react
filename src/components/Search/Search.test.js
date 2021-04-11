import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from '../context';
import Search from './Search';

describe('<Search />', () => {
    it('renders without crashing', () => {
        render (
            <Provider>
                <Search />
            </Provider>
        );
    });
});