import React, { Fragment } from 'react';
import {
  GRAPH_DATA_LIST,
  GRAPH_SECTION_OPTON,
} from '../../definitions/propTypes';
import GraphSectionLine from './GraphSectionLine';
import { getHumanFormattedDate } from '../../utils/dataPresentationUtils';
import s from './GraphSection.module.scss';

const GraphLinesDataList = ({ graphData, optionDisplayed, totals }) => (
  <dl className={s.graphData}>
    {Object.keys(graphData).map((date) => (
      <Fragment key={date}>
        <dt className={s.graphDateEntry}>
          <span className={s.bubble}>{getHumanFormattedDate(date)}</span>
        </dt>
        <dd className={s.graphDateData}>
          {optionDisplayed.confirmed && (
            <GraphSectionLine
              className={s.warning}
              self={graphData[date].confirmed}
              total={totals.confirmed}
            />
          )}
          {optionDisplayed.deaths && (
            <GraphSectionLine
              className={s.danger}
              self={graphData[date].deaths}
              total={totals.deaths}
            />
          )}
          {optionDisplayed.recovered && (
            <GraphSectionLine
              className={s.success}
              self={graphData[date].recovered}
              total={totals.recovered}
            />
          )}
        </dd>
      </Fragment>
    ))}
  </dl>
);

GraphLinesDataList.propTypes = {
  ...GRAPH_DATA_LIST,
  ...GRAPH_SECTION_OPTON,
};

export default GraphLinesDataList;
