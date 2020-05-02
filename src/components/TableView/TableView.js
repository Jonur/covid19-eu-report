import React, { useState } from 'react';
import { sortCountriesDataByColumn } from '../../utils/dataFilteringUtils';
import { getFormattedIncreasingValue } from '../../utils/dataPresentationUtils';
import { TABLE_VIEW_DATA } from '../../definitions/propTypes';
import s from './TableView.module.scss';

const TableView = ({
  columnNames,
  data,
  dataProp,
  dataPropSecondary,
  increasingStat,
  title,
}) => {
  const [countriesData, setCountriesData] = useState(data);
  const [sortedColumns, setSortedColumns] = useState({
    countryName: true,
    [dataProp]: true,
  });

  return (
    <div className={s.tableContainer}>
      <table className={s.table} aria-label={title}>
        <thead className={s.thead}>
          <tr className={s.thr}>
            <th
              className={s.th}
              onClick={() =>
                sortCountriesDataByColumn(
                  'countryName',
                  countriesData,
                  sortedColumns,
                  setSortedColumns,
                  setCountriesData
                )
              }
            >
              <span className={s.columnName}>Country</span>
              <span className={s.columnSort} />
            </th>
            <th
              className={s.th}
              onClick={() =>
                sortCountriesDataByColumn(
                  dataProp,
                  countriesData,
                  sortedColumns,
                  setSortedColumns,
                  setCountriesData
                )
              }
            >
              <span className={s.columnName}>{columnNames[0]}</span>
              <span className={s.columnSort} />
            </th>
            <th
              className={s.th}
              onClick={() =>
                sortCountriesDataByColumn(
                  dataPropSecondary,
                  countriesData,
                  sortedColumns,
                  setSortedColumns,
                  setCountriesData
                )
              }
            >
              <span className={s.columnName}>{columnNames[1]}</span>
              <span className={s.columnSort} />
            </th>
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {countriesData.map((country) => (
            <tr key={country.countryName} className={s.tr}>
              <td className={s.td}>
                <img
                  src={country.flagSrc}
                  alt={`Flag of ${country.countryName}`}
                  className={s.img}
                />
                <span>{country.countryName}</span>
              </td>
              <td className={s.td}>{country[dataProp]}</td>
              <td className={s.td}>
                {getFormattedIncreasingValue(
                  country[dataPropSecondary],
                  increasingStat
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.tfoot}>* Former EU member state</div>
    </div>
  );
};

TableView.propTypes = {
  ...TABLE_VIEW_DATA,
};

TableView.defaultProps = {
  increasingStat: false,
};

export default TableView;
