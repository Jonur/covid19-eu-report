import { arrayOf, number, objectOf, shape, string } from 'prop-types';

export const EU_COUNTRY_COVID19_DATA = arrayOf(
  shape({
    confirmed: number.isRequired,
    date: string.isRequired,
    deaths: number.isRequired,
    recovered: number.isRequired,
  }).isRequired
).isRequired;

export const APP_DATA = {
  ...EU_COUNTRY_COVID19_DATA,
  lastUpdate: string.isRequired,
};

export const EU_COVID19_DATA = {
  euCovidData: objectOf(EU_COUNTRY_COVID19_DATA).isRequired,
};

export const TABLE_VIEW_DATA = {
  countryStatColumnName: string.isRequired,
  data: arrayOf(
    shape({
      countryName: string.isRequired,
      flagSrc: string.isRequired,
      deathsLast24h: number.isRequired,
      totalDeaths: number.isRequired,
      totalCases: number.isRequired,
      casesLast24h: number.isRequired,
      totalRecovered: number.isRequired,
      recoveredLast24h: number.isRequired,
    }).isRequired
  ).isRequired,
  dataProp: string.isRequired,
  title: string.isRequired,
};

export const SECTION_TITLE = {
  alerting: string.isRequired,
  ariaLabelledBy: string.isRequired,
  sectionTitle: string.isRequired,
  sectionSubtitle: string.isRequired,
};

export const GRAPH_SECTION = {
  alerting: string.isRequired,
  ariaLabelledBy: string.isRequired,
  graphData: objectOf(
    shape({
      confirmed: number.isRequired,
      deaths: number.isRequired,
      recovered: number.isRequired,
    }).isRequired
  ).isRequired,
  sectionSubtitle: string.isRequired,
  sectionTitle: string.isRequired,
};
