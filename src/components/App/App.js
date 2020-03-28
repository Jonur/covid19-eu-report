import React from 'react';
import { APP_DATA } from '../../definitions/propTypes';
import { Footer, Header, TableStatSection } from '..';
import { getCountiesTotalsDate } from '../../utils/dataFilteringUtils';
import s from './App.module.scss';

const App = ({ euCovidData, lastUpdate }) => {
  const countiesTotalDeathsToDate = getCountiesTotalsDate(euCovidData);

  return (
    <>
      <Header lastUpdate={lastUpdate} />
      <main aria-label="EU COVID-19 Charts" className={s.statWrapper}>
        <TableStatSection
          ariaLabelledBy="total-deaths-title"
          sectionTitle="Total deaths"
          sectionSubtitle="(+ COVID-19 caused deaths in the past 24 hours)"
          countryStatColumnName="Deaths"
          data={countiesTotalDeathsToDate}
          dataProp="totalDeaths"
          dataPropSecondary="deathsLast24h"
          title="Total deaths table"
        />
        <TableStatSection
          ariaLabelledBy="total-cases-title"
          sectionTitle="Total cases"
          sectionSubtitle="(+ COVID-19 confirmed cases in the past 24 hours)"
          countryStatColumnName="Cases"
          data={countiesTotalDeathsToDate}
          dataProp="totalCases"
          dataPropSecondary="casesLast24h"
          title="Total confirmed cases table"
        />
        <TableStatSection
          ariaLabelledBy="total-recovered-title"
          sectionTitle="Patients recovered"
          sectionSubtitle="(+ COVID-19 recovered patients in the past 24 hours)"
          countryStatColumnName="Recovered"
          data={countiesTotalDeathsToDate}
          dataProp="totalRecovered"
          dataPropSecondary="recoveredLast24h"
          title="Recovered patients table"
          positive
        />
      </main>
      <Footer />
    </>
  );
};

App.propTypes = APP_DATA;

export default App;
