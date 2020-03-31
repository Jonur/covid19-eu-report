import React from 'react';
import classNames from 'classnames';
import s from './GraphSection.module.scss';
import { getStatLineWidth } from '../../utils/graphUtils';

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

export default GraphSectionLine;
