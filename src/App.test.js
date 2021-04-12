import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from './components/context';
import App from './App';

describe('<App />', () => {
    it('renders without crashing', () => {
        render (
            <Provider>
                <App />
            </Provider>
        );
    });
});