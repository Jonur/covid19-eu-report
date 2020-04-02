import React, { useState } from 'react';
import { SECTION_TITLE, TABLE_VIEW_DATA } from '../../definitions/propTypes';
import { SectionTitle, TableView } from '..';
import s from './TableStatSection.module.scss';

const TableStatSection = ({
  alerting,
  ariaLabelledBy,
  countryStatColumnName,
  data,
  dataProp,
  dataPropSecondary,
  sectionSubtitle,
  sectionTitle,
  title,
}) => {
  const [expandedSection, setExpandedSection] = useState(false);

  return (
    <section aria-labelledby={ariaLabelledBy} className={s.section}>
      <SectionTitle
        ariaLabelledBy={ariaLabelledBy}
        alerting={alerting}
        sectionSubtitle={sectionSubtitle}
        sectionTitle={sectionTitle}
        expandedSection={expandedSection}
        setExpandedSection={setExpandedSection}
      />
      {expandedSection && (
        <TableView
          countryStatColumnName={countryStatColumnName}
          data={data}
          dataProp={dataProp}
          dataPropSecondary={dataPropSecondary}
          title={title}
          alerting={alerting}
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
