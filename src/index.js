import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import './media/index.scss';
import { App } from './components';
import getEUcovidData from './utils/getEUcovidData';

getEUcovidData()
  .then(euCovidData =>
    render(
      <StrictMode>
        <App euCovidData={euCovidData} />
      </StrictMode>,
      document.getElementById('covid19-eu-report-app')
    )
  )
  .catch(e => {
    console.log(e);
    document.getElementById('covid19-eu-report-app').innerHTML =
      '<div class="app-error">Sorry about that! There was an error with the data.</div>';
  });
