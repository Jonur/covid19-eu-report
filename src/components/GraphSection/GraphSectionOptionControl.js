import React from 'react';
import classNames from 'classnames';
import { GRAPH_SECTION_OPTION_CONTROL } from '../../definitions/propTypes';
import s from './GraphSection.module.scss';

const GraphSectionOptionControl = ({
  handleChange,
  label,
  optionDisplayed,
  property,
}) => (
  <label htmlFor={`${property}Input`} className={s[`${property}Display`]}>
    <div className={s.checkbox}>
      <span
        onClick={handleChange}
        className={classNames(s.styledInput, s[`${property}ViewControl`], {
          [s.isChecked]: optionDisplayed[property],
        })}
      />
      <input
        id={`${property}Input`}
        className={s.hiddenInput}
        name={`${property}`}
        type="checkbox"
        value={optionDisplayed[property]}
        checked={optionDisplayed[property]}
        onChange={handleChange}
      />
    </div>
    <span>{label}</span>
  </label>
);

GraphSectionOptionControl.propTypes = GRAPH_SECTION_OPTION_CONTROL;

export default GraphSectionOptionControl;
