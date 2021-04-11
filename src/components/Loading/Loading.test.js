import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from '../context';
import Loading from './Loading';

describe('<Loading />', () => {
    it('renders without crashing', () => {
        render (
            <Provider>
                <Loading />
            </Provider>
        );
    });
});