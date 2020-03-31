import React, { useState } from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { sortCountriesDataByColumn } from '../../utils/dataFilteringUtils';
import { TABLE_VIEW_DATA } from '../../definitions/propTypes';
import s from './TableView.module.scss';

const TableView = ({
  alerting,
  countryStatColumnName,
  data,
  dataProp,
  dataPropSecondary,
  title,
}) => {
  const [countriesData, setCountriesData] = useState(data);
  const [sortedColumns, setSortedColumns] = useState({
    countryName: true,
    [dataProp]: true,
  });

  return (
    <table className={s.table} aria-label={title}>
      <thead className={s.thead}>
        <tr>
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
            <td className={s.td}>
              {country[dataProp]}
              {!!country[dataPropSecondary] && (
                <span
                  className={classNames(s.secondaryInfo, s[alerting])}
                >{`(+${country[dataPropSecondary]})`}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot className={s.tfoot}>
        <tr className={s.tr}>
          <td colSpan="2" className={classNames(s.td, s.formerEUcountry)}>
            * Former EU member state
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

TableView.propTypes = {
  ...TABLE_VIEW_DATA,
  alerting: string.isRequired,
};

export default TableView;
