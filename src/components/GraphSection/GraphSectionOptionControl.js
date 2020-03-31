import React from 'react';
import s from './GraphSection.module.scss';

const GraphSectionOptionControl = ({
  property,
  label,
  optionDisplayed,
  handleChange,
}) => (
  <label className={s[`${property}Display`]}>
    <input
      name={`${property}`}
      type="checkbox"
      value={optionDisplayed[property]}
      checked={optionDisplayed[property]}
      onChange={handleChange}
    />{' '}
    <span>{label}</span>
  </label>
);

export default GraphSectionOptionControl;
