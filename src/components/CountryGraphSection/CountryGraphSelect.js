import React from 'react';
import { EU_COUNTRIES } from '../../definitions/constants';
import s from './CountryGraphSection.module.scss';

const CountryGraphSelect = ({ handleUserSelect, selectedCountry }) => (
  <select
    name="user-selected-country"
    onChange={handleUserSelect}
    defaultValue={selectedCountry}
    className={s.select}
  >
    <option value={''} disabled>
      Please select...
    </option>
    {EU_COUNTRIES.map((country) => (
      <option value={country} key={country}>
        {country}
      </option>
    ))}
  </select>
);

export default CountryGraphSelect;
