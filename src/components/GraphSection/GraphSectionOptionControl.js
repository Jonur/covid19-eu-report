import React from 'react';
import { GRAPH_SECTION_OPTION_CONTROL } from '../../definitions/propTypes';
import s from './GraphSection.module.scss';

const GraphSectionOptionControl = ({
  handleChange,
  label,
  optionDisplayed,
  property,
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

GraphSectionOptionControl.propTypes = GRAPH_SECTION_OPTION_CONTROL;

export default GraphSectionOptionControl;
