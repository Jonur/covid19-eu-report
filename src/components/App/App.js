import React from 'react';
import { APP_DATA } from '../../definitions/propTypes';
import { Header, TableStatSection } from '..';
import { getCountiesTotalDeathsToDate } from '../../utils/dataFilteringUtils';

const App = ({ euCovidData, lastUpdate }) => {
  const countiesTotalDeathsToDate = getCountiesTotalDeathsToDate(euCovidData);

  return (
    <>
      <Header lastUpdate={lastUpdate} />
      <main aria-label="EU COVID-19 Charts">
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
      </main>
    </>
  );
};

App.propTypes = APP_DATA;

export default App;
