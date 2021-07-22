import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// https://bit.ly/CRA-vitals
reportWebVitals();
