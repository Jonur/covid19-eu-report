import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { App } from './components';
import './media/index.scss';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('covid19-eu-report-app')
);
