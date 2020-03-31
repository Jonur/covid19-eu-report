import React from 'react';
import { APP_DATA } from '../../definitions/propTypes';
import { Footer, GraphSection, Header, TableStatSection } from '..';
import {
  getCountiesTotalsDate,
  getEUTotalsByDateNewestFirst,
} from '../../utils/dataFilteringUtils';
import { formatThousands, getEUtotals } from '../../utils/graphUtils';
import s from './App.module.scss';

const App = ({ euCovidData, lastUpdate }) => {
  const countiesTotalsToDate = getCountiesTotalsDate(euCovidData);
  const euTotalsByDate = getEUTotalsByDateNewestFirst(euCovidData);
  const totals = getEUtotals(euTotalsByDate);

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
          sectionTitle={`${formatThousands(totals.deaths)} Total deaths`}
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
            totals.confirmed
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
            totals.recovered
          )} Patients recovered`}
          sectionSubtitle="(+ COVID-19 recovered patients in the past 24 hours)"
          title="Recovered patients table"
        />
        <GraphSection
          alerting="success"
          ariaLabelledBy="increase-timeline-title"
          graphData={euTotalsByDate}
          sectionTitle="EU Incidents Timeline"
          sectionSubtitle="COVID-19 timeline in the European Union"
          totals={totals}
        />
      </main>
      <Footer />
    </>
  );
};

App.propTypes = APP_DATA;

export default App;
