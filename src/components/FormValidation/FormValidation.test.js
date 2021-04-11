import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from '../context';
import FormValidation from './FormValidation';

describe('<FormValidation />', () => {
    it('renders without crashing', () => {
        render (
            <Provider>
                <FormValidation />
            </Provider>
        );
    });
});