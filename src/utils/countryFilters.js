import { chain, mapValues } from 'lodash';
import { EU_FLAGS } from '../definitions/constants';

export const getCountryFlagURL = countryName =>
  EU_FLAGS?.[countryName]?.country_code
    ? `https://www.countryflags.io/${EU_FLAGS[countryName].country_code}/flat/32.png`
    : '';

export const getCountiesTotalDeathsToDate = countriesStats => {
  const filteredStats = Object.keys(countriesStats).map(country => ({
    countryName: country,
    flagSrc: getCountryFlagURL(country),
    totalDeaths:
      countriesStats[country][countriesStats[country].length - 1].deaths || 0,
  }));

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
