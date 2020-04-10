import React, { useEffect, useState } from 'react';
import {
  CountryGraphSection,
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
        euCovidData,
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
    euCovidData,
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
          alerting="warning"
          ariaLabelledBy="total-cases-title"
          data={countiesTotalsToDate}
          dataProp="totalCases"
          dataPropSecondary="casesLast24h"
          icon="warning-check"
          sectionTotals={`${formatThousands(euTotals.current.confirmed)}`}
          sectionNew={`${formatThousands(euTotals.new.confirmed)}`}
          sectionTitle="EU confirmed cases"
          title="Total confirmed cases table"
        />
        <TableStatSection
          alerting="danger"
          ariaLabelledBy="total-deaths-title"
          data={countiesTotalsToDate}
          dataProp="totalDeaths"
          dataPropSecondary="deathsLast24h"
          icon="minus"
          sectionTotals={`${formatThousands(euTotals.current.deaths)}`}
          sectionNew={`${formatThousands(euTotals.new.deaths)}`}
          sectionTitle="EU deaths"
          title="Total deaths table"
        />
        <TableStatSection
          alerting="success"
          ariaLabelledBy="total-recovered-title"
          data={countiesTotalsToDate}
          dataProp="totalRecovered"
          dataPropSecondary="recoveredLast24h"
          icon="plus"
          sectionTotals={`${formatThousands(euTotals.current.recovered)}`}
          sectionNew={`${formatThousands(euTotals.new.recovered)}`}
          sectionTitle="EU recovered patients"
          title="Recovered patients table"
        />
        <GraphSection
          ariaLabelledBy="increase-timeline-title"
          graphData={euTotalsByDate}
          icon="stats"
          sectionTitle="Useful statistics"
          sectionSubtitle="EU totals timeline"
          totals={euTotals.current}
        />
        <CountryGraphSection
          ariaLabelledBy="countr-increase-timeline-title"
          graphData={euCovidData}
          sectionSubtitle="Every EU country's timeline"
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
