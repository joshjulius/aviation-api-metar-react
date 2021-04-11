import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from '../context';
import Main from './Main';

describe('<Main />', () => {
    it('renders without crashing', () => {
        render (
            <Provider>
                <Main />
            </Provider>
        );
    });
});