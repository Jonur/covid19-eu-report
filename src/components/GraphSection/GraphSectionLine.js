import React from 'react';
import classNames from 'classnames';
import { GRAPH_SECTION_LINE } from '../../definitions/propTypes';
import s from './GraphSection.module.scss';
import { getStatLineWidth } from '../../utils/dataPresentationUtils';

export const GraphSectionLine = ({ className, self, total }) => {
  const selfWidth = getStatLineWidth(self, total);
  return (
    <div
      style={{ width: selfWidth }}
      className={classNames(className, { [s.noData]: !selfWidth })}
    >
      {self}
    </div>
  );
};

GraphSectionLine.propTypes = GRAPH_SECTION_LINE;

export default GraphSectionLine;
