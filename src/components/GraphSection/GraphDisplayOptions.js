import React from 'react';
import { GRAPH_DISPLAY_OPTIONS } from '../../definitions/propTypes';
import GraphSectionOptionControl from './GraphSectionOptionControl';
import s from './GraphSection.module.scss';

const GraphDisplayOptions = ({ optionDisplayed, handleChange }) => (
  <div className={s.displayOptions}>
    <GraphSectionOptionControl
      property="confirmed"
      optionDisplayed={optionDisplayed}
      handleChange={handleChange}
      label="Confirmed"
    />
    <GraphSectionOptionControl
      property="deaths"
      optionDisplayed={optionDisplayed}
      handleChange={handleChange}
      label="Deaths"
    />
    <GraphSectionOptionControl
      property="recovered"
      optionDisplayed={optionDisplayed}
      handleChange={handleChange}
      label="Recovered"
    />
  </div>
);

GraphDisplayOptions.propTypes = {
  ...GRAPH_DISPLAY_OPTIONS,
};

export default GraphDisplayOptions;
