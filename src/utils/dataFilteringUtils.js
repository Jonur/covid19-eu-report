import { chain, mapValues } from 'lodash';
import { EU_FLAGS, MONTHS } from '../definitions/constants';

export const getCountryFlagURL = countryName =>
  EU_FLAGS?.[countryName]?.country_code
    ? `https://www.countryflags.io/${EU_FLAGS[countryName].country_code}/flat/32.png`
    : '';

export const getTotalPropOfCountry = (countryData, prop) =>
  countryData[countryData.length - 1]?.[prop] || 0;

export const getTotalPropOfCountryYesterday = (countryData, prop) =>
  countryData[countryData.length - 2]?.[prop] || 0;

export const getCountiesTotalsDate = countriesStats => {
  const filteredStats = Object.keys(countriesStats).map(country => {
    const totalDeaths = getTotalPropOfCountry(
      countriesStats[country],
      'deaths'
    );
    const deathsLast24h =
      totalDeaths -
      getTotalPropOfCountryYesterday(countriesStats[country], 'deaths');
    const totalCases = getTotalPropOfCountry(
      countriesStats[country],
      'confirmed'
    );
    const casesLast24h =
      totalCases -
      getTotalPropOfCountryYesterday(countriesStats[country], 'confirmed');
    const totalRecovered = getTotalPropOfCountry(
      countriesStats[country],
      'recovered'
    );
    const recoveredLast24h =
      totalRecovered -
      getTotalPropOfCountryYesterday(countriesStats[country], 'recovered');

    return {
      countryName: country,
      flagSrc: getCountryFlagURL(country),
      totalDeaths,
      deathsLast24h,
      totalCases,
      casesLast24h,
      totalRecovered,
      recoveredLast24h,
    };
  });

  return chain(filteredStats)
    .sortBy('totalDeaths')
    .reverse()
    .value();
};

export const getSortedColumns = (countriesData, column, columnStatus) =>
  columnStatus
    ? chain(countriesData)
        .sortBy(column)
        .reverse()
        .value()
    : chain(countriesData)
        .sortBy(column)
        .value();

export const getSortedColumnsStatii = (
  column,
  columnStatus,
  sortedColumns
) => ({
  ...mapValues(sortedColumns, () => false),
  [column]: !columnStatus,
});

export const sortCountresDataByColumn = (
  column = '',
  countriesData,
  sortedColumns,
  setSortedColumns,
  setCountriesData
) => {
  const columnStatus = sortedColumns[column];
  const sortedColumnsResult = getSortedColumns(
    countriesData,
    column,
    columnStatus
  );
  const sortedColumnsStatii = getSortedColumnsStatii(
    column,
    columnStatus,
    sortedColumns
  );

  setSortedColumns(sortedColumnsStatii);
  setCountriesData(sortedColumnsResult);
};

export const getLastUpdateFromData = (data = {}) => {
  const firstCountryEntry = Object.values(data)[0];
  const dateFromData =
    firstCountryEntry?.[firstCountryEntry.length - 1]?.date || '';

  if (dateFromData) {
    const date = new Date(dateFromData);
    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }

  return '';
};
