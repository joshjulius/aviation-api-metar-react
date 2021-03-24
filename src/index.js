import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from './components/context';
import './css/normalize.css';
import './css/styles.css';
import App from './components/App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);