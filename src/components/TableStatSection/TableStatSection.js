import React, { useState } from 'react';
import classNames from 'classnames';
import { TABLE_STAT_SECTION } from '../../definitions/propTypes';
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
}) => {
  const [expandedSection, setExpandedSection] = useState(true);

  return (
    <section aria-labelledby={ariaLabelledBy} className={s.section}>
      <h2
        id={ariaLabelledBy}
        onClick={() => setExpandedSection(!expandedSection)}
        className={s.sectionTitle}
      >
        {sectionTitle}
        <span className={s.last24hInfo}>{sectionSubtitle}</span>
        <span
          className={classNames(s.expandCollapseArrow, {
            [s.expanded]: expandedSection,
          })}
        />
      </h2>
      <TableView
        countryStatColumnName={countryStatColumnName}
        data={data}
        dataProp={dataProp}
        dataPropSecondary={dataPropSecondary}
        displayStatus={expandedSection}
        title={title}
      />
    </section>
  );
};

TableStatSection.propTypes = TABLE_STAT_SECTION;

export default TableStatSection;
