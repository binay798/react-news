import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import Store from './store/store'

// const apiKey = 'ea6888d8a18c4f27bb31dea9a4bcf55e';
const app = (
  <Store>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Store>
);

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);


