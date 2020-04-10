import React from 'react';
import {
  GRAPH_DISPLAY_OPTIONS,
  GRAPH_DATA_LIST,
} from '../../definitions/propTypes';
import GraphDisplayOptions from './GraphDisplayOptions';
import GraphLinesDataList from './GraphLinesDataList';
import s from './GraphSection.module.scss';

const GraphSectionResult = ({
  optionDisplayed,
  handleChange,
  graphData,
  totals,
}) => (
  <div className={s.graphStatsContainer}>
    <GraphDisplayOptions
      optionDisplayed={optionDisplayed}
      handleChange={handleChange}
    />
    <GraphLinesDataList
      graphData={graphData}
      optionDisplayed={optionDisplayed}
      totals={totals}
    />
  </div>
);

GraphSectionResult.propTypes = {
  ...GRAPH_DISPLAY_OPTIONS,
  ...GRAPH_DATA_LIST,
};

export default GraphSectionResult;
