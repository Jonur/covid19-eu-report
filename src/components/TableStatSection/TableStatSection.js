import React, { useState } from 'react';
import { bool, string } from 'prop-types';
import classNames from 'classnames';
import { TABLE_VIEW_DATA } from '../../definitions/propTypes';
import { TableView } from '..';
import s from './TableStatSection.module.scss';

const TableStatSection = ({
  ariaLabelledBy,
  countryStatColumnName,
  data,
  dataProp,
  dataPropSecondary,
  sectionTitle,
  sectionSubtitle,
  title,
  positive,
}) => {
  const [expandedSection, setExpandedSection] = useState(false);

  return (
    <section aria-labelledby={ariaLabelledBy} className={s.section}>
      <h2
        id={ariaLabelledBy}
        onClick={() => setExpandedSection(!expandedSection)}
        className={s.sectionTitle}
      >
        {sectionTitle}
        <span className={classNames(s.last24hInfo, { [s.positive]: positive })}>
          {sectionSubtitle}
        </span>
        <span
          className={classNames(s.expandCollapseArrow, {
            [s.expanded]: expandedSection,
          })}
        />
      </h2>
      {expandedSection && (
        <TableView
          countryStatColumnName={countryStatColumnName}
          data={data}
          dataProp={dataProp}
          dataPropSecondary={dataPropSecondary}
          title={title}
          positive={positive}
        />
      )}
    </section>
  );
};

TableStatSection.propTypes = {
  ...TABLE_VIEW_DATA,
  ariaLabelledBy: string.isRequired,
  sectionTitle: string.isRequired,
  sectionSubtitle: string.isRequired,
  positive: bool,
};

TableStatSection.defaultProps = {
  positive: false,
};

export default TableStatSection;
