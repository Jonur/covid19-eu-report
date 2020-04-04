import React, { useEffect, useState } from 'react';
import {
  Footer,
  GraphSection,
  Header,
  PiechartSection,
  TableStatSection,
} from '..';
import {
  getCountiesTotalsDate,
  getEUCovidData,
  getEUTotalsByDateNewestFirst,
  getLastUpdateFromData,
  getWorldTotals,
} from '../../utils/dataFilteringUtils';
import {
  formatThousands,
  getEUtotals,
} from '../../utils/dataPresentationUtils';
import getApiData from '../../utils/getApiData';
import s from './App.module.scss';

const App = () => {
  const [appData, setAppData] = useState({});
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    getApiData().then((apiData) => {
      const worldTotals = getWorldTotals(apiData);
      const euCovidData = getEUCovidData(apiData);
      const lastUpdate = getLastUpdateFromData(euCovidData);
      const countiesTotalsToDate = getCountiesTotalsDate(euCovidData);
      const euTotalsByDate = getEUTotalsByDateNewestFirst(euCovidData);
      const euTotals = getEUtotals(euTotalsByDate);

      setAppData({
        countiesTotalsToDate,
        euTotals,
        euTotalsByDate,
        lastUpdate,
        worldTotals,
      });

      setDataFetched(true);
    });
  }, []);

  if (!dataFetched) {
    return <div className={s.appLoading}>Loading...</div>;
  }

  const {
    countiesTotalsToDate,
    euTotals,
    euTotalsByDate,
    lastUpdate,
    worldTotals,
  } = appData;

  return (
    <>
      <Header lastUpdate={lastUpdate} />
      <main aria-label="EU COVID-19 Charts" className={s.statWrapper}>
        <TableStatSection
          alerting="danger"
          ariaLabelledBy="total-deaths-title"
          countryStatColumnName="Deaths"
          data={countiesTotalsToDate}
          dataProp="totalDeaths"
          dataPropSecondary="deathsLast24h"
          sectionTotals={`${formatThousands(euTotals.current.deaths)}`}
          sectionNew={`${formatThousands(euTotals.new.deaths)}`}
          sectionTitle="EU deaths"
          title="Total deaths table"
        />
        <TableStatSection
          alerting="warning"
          ariaLabelledBy="total-cases-title"
          countryStatColumnName="Cases"
          data={countiesTotalsToDate}
          dataProp="totalCases"
          dataPropSecondary="casesLast24h"
          sectionTotals={`${formatThousands(euTotals.current.confirmed)}`}
          sectionNew={`${formatThousands(euTotals.new.confirmed)}`}
          sectionTitle="EU Confirmed cases"
          title="Total confirmed cases table"
        />
        <TableStatSection
          alerting="success"
          ariaLabelledBy="total-recovered-title"
          countryStatColumnName="Recovered"
          data={countiesTotalsToDate}
          dataProp="totalRecovered"
          dataPropSecondary="recoveredLast24h"
          sectionTotals={`${formatThousands(euTotals.current.recovered)}`}
          sectionNew={`${formatThousands(euTotals.new.recovered)}`}
          sectionTitle="EU Recovered patients"
          title="Recovered patients table"
        />
        <GraphSection
          ariaLabelledBy="increase-timeline-title"
          graphData={euTotalsByDate}
          sectionTitle="Useful statistics"
          sectionSubtitle="EU Incidents timeline"
          totals={euTotals.current}
        />
        <PiechartSection
          ariaLabelledBy="eu-row-totals"
          sectionSubtitle="EU % vs Rest of the World"
          euTotals={euTotals.current}
          worldTotals={worldTotals}
        />
      </main>
      <Footer />
    </>
  );
};

export default App;
