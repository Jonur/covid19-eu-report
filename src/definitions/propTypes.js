import { arrayOf, number, objectOf, shape, string } from 'prop-types';

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
  countryStatColumnName: string.isRequired,
  data: arrayOf(
    shape({
      countryName: string.isRequired,
      flagSrc: string.isRequired,
      totalDeaths: number.isRequired,
    }).isRequired
  ).isRequired,
  dataProp: string.isRequired,
  title: string.isRequired,
};

export const TABLE_STAT_SECTION = {
  ...TABLE_VIEW_DATA,
  ariaLabelledBy: string.isRequired,
  sectionTitle: string.isRequired,
};
