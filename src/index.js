import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { App } from './components';
import getApiData from './utils/getApiData';
import {
  getEUCovidData,
  getLastUpdateFromData,
  getWorldTotals,
} from './utils/dataFilteringUtils';
import './media/index.scss';

getApiData()
  .then(apiData => {
    const worldTotals = getWorldTotals(apiData);
    const euCovidData = getEUCovidData(apiData);
    const lastUpdate = getLastUpdateFromData(euCovidData);

    render(
      <StrictMode>
        <App
          euCovidData={euCovidData}
          lastUpdate={lastUpdate}
          worldTotals={worldTotals}
        />
      </StrictMode>,
      document.getElementById('covid19-eu-report-app')
    );
  })
  .catch(e => {
    console.log(e);
    document.getElementById('covid19-eu-report-app').innerHTML =
      '<div class="app-error">Sorry about that! There was an error with the data.</div>';
  });
