import React from 'react';
import { func, string } from 'prop-types';
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
      Select country...
    </option>
    {EU_COUNTRIES.map((country) => (
      <option value={country} key={country}>
        {country}
      </option>
    ))}
  </select>
);

CountryGraphSelect.propTypes = {
  handleUserSelect: func.isRequired,
  selectedCountry: string.isRequired,
};

export default CountryGraphSelect;
