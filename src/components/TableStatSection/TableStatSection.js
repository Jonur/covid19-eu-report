import React, { useState } from 'react';
import { SECTION_TITLE, TABLE_VIEW_DATA } from '../../definitions/propTypes';
import { SectionTitle, TableView } from '..';
import s from './TableStatSection.module.scss';

const TableStatSection = ({
  alerting,
  ariaLabelledBy,
  data,
  dataProp,
  dataPropSecondary,
  icon,
  sectionTotals,
  sectionNew,
  sectionTitle,
  title,
}) => {
  const [expandedSection, setExpandedSection] = useState(false);

  return (
    <section aria-labelledby={ariaLabelledBy} className={s.section}>
      <SectionTitle
        ariaLabelledBy={ariaLabelledBy}
        alerting={alerting}
        expandedSection={expandedSection}
        icon={icon}
        sectionTotals={sectionTotals}
        sectionNew={sectionNew}
        sectionTitle={sectionTitle}
        setExpandedSection={setExpandedSection}
      />
      {expandedSection && (
        <TableView
          data={data}
          dataProp={dataProp}
          dataPropSecondary={dataPropSecondary}
          title={title}
        />
      )}
    </section>
  );
};

TableStatSection.propTypes = {
  ...SECTION_TITLE,
  ...TABLE_VIEW_DATA,
};

export default TableStatSection;
