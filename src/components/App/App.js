import React from 'react';
import { EU_COVID19_DATA } from '../../definitions/propTypes';
import { Header, TableStatSection } from '..';
import { getCountiesTotalDeathsToDate } from '../../utils/countryFilters';

const App = ({ euCovidData }) => {
  const countiesTotalDeathsToDate = getCountiesTotalDeathsToDate(euCovidData);

  return (
    <>
      <Header />
      <main aria-label="EU COVID-19 Charts">
        <TableStatSection
          ariaLabelledBy="total-deaths-title"
          sectionTitle="Total deaths"
          countryStatColumnName="Deaths"
          data={countiesTotalDeathsToDate}
          dataProp="totalDeaths"
          title="Total deaths table"
        />
      </main>
    </>
  );
};

App.propTypes = EU_COVID19_DATA;

export default App;
