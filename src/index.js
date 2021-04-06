import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from './components/context';
import './normalize.css';
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);