import {
  arrayOf,
  bool,
  func,
  number,
  objectOf,
  shape,
  string,
} from 'prop-types';

export const COUNTRY_BASE_DATA = shape({
  confirmed: number.isRequired,
  deaths: number.isRequired,
  recovered: number.isRequired,
}).isRequired;

export const EU_COUNTRY_COVID19_DATA = arrayOf(
  shape({
    confirmed: number.isRequired,
    date: string.isRequired,
    deaths: number.isRequired,
    recovered: number.isRequired,
  }).isRequired
).isRequired;

export const EU_COVID19_DATA = {
  euCovidData: objectOf(EU_COUNTRY_COVID19_DATA).isRequired,
};

export const TABLE_VIEW_DATA = {
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
  alerting: string,
  ariaLabelledBy: string.isRequired,
  icon: string,
  sectionTotals: string,
  sectionNew: string,
  sectionTitle: string,
  sectionSubtitle: string,
};

export const GRAPH_SECTION = {
  alerting: string,
  ariaLabelledBy: string.isRequired,
  graphData: objectOf(
    shape({
      confirmed: number.isRequired,
      deaths: number.isRequired,
      recovered: number.isRequired,
    }).isRequired
  ).isRequired,
  icon: string,
  sectionSubtitle: string.isRequired,
  sectionTitle: string.isRequired,
  totals: COUNTRY_BASE_DATA,
};

export const GRAPH_SECTION_OPTION_CONTROL = {
  property: string.isRequired,
  label: string.isRequired,
  optionDisplayed: shape({
    confirmed: bool.isRequired,
    deaths: bool.isRequired,
    recovered: bool.isRequired,
  }).isRequired,
  handleChange: func.isRequired,
};

export const GRAPH_SECTION_LINE = {
  className: string.isRequired,
  self: number.isRequired,
  total: number.isRequired,
};

export const PIE_CHART_SECTION = {
  alerting: string,
  ariaLabelledBy: string.isRequired,
  sectionSubtitle: string.isRequired,
  sectionTitle: string,
  worldTotals: COUNTRY_BASE_DATA,
  euTotals: COUNTRY_BASE_DATA,
};

export const PIE_CHART = {
  className: string.isRequired,
  title: string.isRequired,
  piechartColour: string.isRequired,
  trackingTitle: string.isRequired,
  trackingValue: number.isRequired,
};
