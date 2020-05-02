import React, { useEffect, useState } from 'react';
import {
  CountryGraphSection,
  CurveSection,
  Footer,
  GraphSection,
  Header,
  PiechartSection,
  StatsPerMillion,
  TableStatSection,
} from '..';
import {
  getcountriesTotalsDate,
  getEUCovidData,
  getEuropeCountriesMap,
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
  const [errorStatus, setErrorStatus] = useState(false);

  useEffect(() => {
    getApiData().then(({ covid19data, europeanCountriesData, error }) => {
      if (!error) {
        const worldTotals = getWorldTotals(covid19data);
        const euCovidData = getEUCovidData(covid19data);
        const lastUpdate = getLastUpdateFromData(euCovidData);
        const countriesTotalsToDate = getcountriesTotalsDate(euCovidData);
        const euTotalsByDate = getEUTotalsByDateNewestFirst(euCovidData);
        const euTotals = getEUtotals(euTotalsByDate);
        const europeanCountriesDataMap = getEuropeCountriesMap(
          europeanCountriesData
        );

        setAppData({
          countriesTotalsToDate,
          europeanCountriesDataMap,
          euCovidData,
          euTotals,
          euTotalsByDate,
          lastUpdate,
          worldTotals,
        });

        setDataFetched(true);
      }

      setErrorStatus(error);
    });
  }, []);

  if (errorStatus) {
    return (
      <div className={s.appLoading}>
        There was an error while loading the app.
      </div>
    );
  }

  if (!dataFetched) {
    return <div className={s.appLoading}>Loading...</div>;
  }

  const {
    countriesTotalsToDate,
    euCovidData,
    europeanCountriesDataMap,
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
          columnNames={['Total', 'New']}
          data={countriesTotalsToDate}
          dataProp="totalCases"
          dataPropSecondary="casesLast24h"
          icon="warning-check"
          sectionTotals={`${formatThousands(euTotals.current.confirmed)}`}
          sectionNew={`${formatThousands(euTotals.new.confirmed)}`}
          sectionTitle="EU confirmed cases"
          title="Total confirmed cases table"
          increasingStat
        />
        <TableStatSection
          alerting="danger"
          ariaLabelledBy="total-deaths-title"
          columnNames={['Total', 'New']}
          data={countriesTotalsToDate}
          dataProp="totalDeaths"
          dataPropSecondary="deathsLast24h"
          icon="minus"
          sectionTotals={`${formatThousands(euTotals.current.deaths)}`}
          sectionNew={`${formatThousands(euTotals.new.deaths)}`}
          sectionTitle="EU deaths"
          title="Total deaths table"
          increasingStat
        />
        <TableStatSection
          alerting="success"
          ariaLabelledBy="total-recovered-title"
          columnNames={['Total', 'New']}
          data={countriesTotalsToDate}
          dataProp="totalRecovered"
          dataPropSecondary="recoveredLast24h"
          icon="plus"
          sectionTotals={`${formatThousands(euTotals.current.recovered)}`}
          sectionNew={`${formatThousands(euTotals.new.recovered)}`}
          sectionTitle="EU recovered patients"
          title="Recovered patients table"
          increasingStat
        />
        <GraphSection
          ariaLabelledBy="increase-timeline-title"
          graphData={euTotalsByDate}
          icon="stats"
          sectionTitle="COVID-19 EU statistics"
          sectionSubtitle="EU totals timeline"
          totals={euTotals.current}
        />
        <CountryGraphSection
          ariaLabelledBy="country-increase-timeline-title"
          graphData={euCovidData}
          sectionSubtitle="Each country's totals timeline"
        />
        <CurveSection
          ariaLabelledBy="new-cases-curve"
          graphData={euCovidData}
          sectionSubtitle="Each country's new cases curve"
        />
        <StatsPerMillion
          ariaLabelledBy="eu-stats-per-million"
          columnNames={['Cases', 'Deaths']}
          data={countriesTotalsToDate}
          dataProp="cases"
          dataPropSecondary="deaths"
          europeanCountriesData={europeanCountriesDataMap}
          sectionSubtitle="Country stats per million of population"
          title="Country stats per million of population table"
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
