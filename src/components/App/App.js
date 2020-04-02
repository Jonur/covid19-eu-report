import React from 'react';
import { APP_DATA } from '../../definitions/propTypes';
import {
  Footer,
  GraphSection,
  Header,
  PiechartSection,
  TableStatSection,
} from '..';
import {
  getCountiesTotalsDate,
  getEUTotalsByDateNewestFirst,
} from '../../utils/dataFilteringUtils';
import {
  formatThousands,
  getEUtotals,
} from '../../utils/dataPresentationUtils';
import s from './App.module.scss';

const App = ({ euCovidData, lastUpdate, worldTotals }) => {
  const countiesTotalsToDate = getCountiesTotalsDate(euCovidData);
  const euTotalsByDate = getEUTotalsByDateNewestFirst(euCovidData);
  const euTotals = getEUtotals(euTotalsByDate);

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
          sectionTitle={`${formatThousands(euTotals.deaths)} Total deaths`}
          sectionSubtitle="(+ COVID-19 caused deaths in the past 24 hours)"
          title="Total deaths table"
        />
        <TableStatSection
          alerting="warning"
          ariaLabelledBy="total-cases-title"
          countryStatColumnName="Cases"
          data={countiesTotalsToDate}
          dataProp="totalCases"
          dataPropSecondary="casesLast24h"
          sectionTitle={`${formatThousands(
            euTotals.confirmed
          )} Total confirmed cases`}
          sectionSubtitle="(+ COVID-19 confirmed cases in the past 24 hours)"
          title="Total confirmed cases table"
        />
        <TableStatSection
          alerting="success"
          ariaLabelledBy="total-recovered-title"
          countryStatColumnName="Recovered"
          data={countiesTotalsToDate}
          dataProp="totalRecovered"
          dataPropSecondary="recoveredLast24h"
          sectionTitle={`${formatThousands(
            euTotals.recovered
          )} Patients recovered`}
          sectionSubtitle="(+ COVID-19 recovered patients in the past 24 hours)"
          title="Recovered patients table"
        />
        <GraphSection
          ariaLabelledBy="increase-timeline-title"
          graphData={euTotalsByDate}
          sectionTitle="EU Incidents Timeline"
          sectionSubtitle="COVID-19 timeline in the European Union"
          totals={euTotals}
        />
        <PiechartSection
          ariaLabelledBy="eu-row-totals"
          sectionTitle="EU % vs Rest of the World"
          sectionSubtitle="COVID-19 EU percentages versus the rest of the world"
          euTotals={euTotals}
          worldTotals={worldTotals}
        />
      </main>
      <Footer />
    </>
  );
};

App.propTypes = APP_DATA;

export default App;
