import { chain, mapValues } from 'lodash';
import { EU_FLAGS, MONTHS } from '../definitions/constants';

export const getCountryFlagURL = countryName =>
  EU_FLAGS?.[countryName]?.country_code
    ? `https://www.countryflags.io/${EU_FLAGS[countryName].country_code}/flat/32.png`
    : '';

export const getCountiesTotalDeathsToDate = countriesStats => {
  const filteredStats = Object.keys(countriesStats).map(country => {
    const totalDeaths =
      countriesStats[country][countriesStats[country].length - 1]?.deaths || 0;
    const deathsLast24h =
      totalDeaths -
      (countriesStats[country][countriesStats[country].length - 2]?.deaths ||
        0);

    return {
      countryName: country,
      deathsLast24h,
      flagSrc: getCountryFlagURL(country),
      totalDeaths,
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
