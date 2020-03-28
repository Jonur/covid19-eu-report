import React, { useState } from 'react';
import classNames from 'classnames';
import { sortCountresDataByColumn } from '../../utils/dataFilteringUtils';
import { TABLE_VIEW_DATA } from '../../definitions/propTypes';
import s from './TableView.module.scss';

const TableView = ({
  countryStatColumnName,
  data,
  dataProp,
  displayStatus,
  title,
}) => {
  const [countriesData, setCountriesData] = useState(data);
  const [sortedColumns, setSortedColumns] = useState({
    countryName: true,
    [dataProp]: true,
  });

  return (
    <table
      className={classNames(s.table, { [s.expanded]: displayStatus })}
      aria-label={title}
    >
      <thead className={s.thead}>
        <tr>
          <th
            className={s.th}
            onClick={() =>
              sortCountresDataByColumn(
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
              sortCountresDataByColumn(
                dataProp,
                countriesData,
                sortedColumns,
                setSortedColumns,
                setCountriesData
              )
            }
          >
            <span className={s.columnName}>{countryStatColumnName}</span>
            <span className={s.columnSort} />
          </th>
        </tr>
      </thead>
      <tbody className={s.tbody}>
        {countriesData.map(country => (
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableView.propTypes = TABLE_VIEW_DATA;

export default TableView;
