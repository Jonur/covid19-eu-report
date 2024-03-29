import React, { useState } from 'react';
import { SECTION_TITLE, TABLE_VIEW_DATA } from '../../definitions/propTypes';
import { SectionTitle, TableView } from '..';
import s from './TableStatSection.module.scss';

const TableStatSection = ({
  alerting,
  ariaLabelledBy,
  columnNames,
  data,
  dataProp,
  dataPropSecondary,
  icon,
  increasingStat,
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
          columnNames={columnNames}
          data={data}
          dataProp={dataProp}
          dataPropSecondary={dataPropSecondary}
          increasingStat={increasingStat}
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

TableStatSection.defaultProps = {
  increasingStat: false,
};

export default TableStatSection;
