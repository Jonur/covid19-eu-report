import React, { useState } from 'react';
import { SECTION_TITLE, TABLE_VIEW_DATA } from '../../definitions/propTypes';
import { SectionTitle, TableView } from '..';
import { getCountryStatsPerMillion } from '../../utils/dataFilteringUtils';
import s from './StatsPerMillion.module.scss';

const StatsPerMillion = ({
  ariaLabelledBy,
  columnNames,
  data,
  dataProp,
  dataPropSecondary,
  europeanCountriesData,
  sectionSubtitle,
  title,
}) => {
  const [expandedSection, setExpandedSection] = useState(false);

  return (
    <section aria-labelledby={ariaLabelledBy} className={s.section}>
      <SectionTitle
        ariaLabelledBy={ariaLabelledBy}
        expandedSection={expandedSection}
        sectionSubtitle={sectionSubtitle}
        setExpandedSection={setExpandedSection}
      />
      {expandedSection && (
        <TableView
          columnNames={columnNames}
          data={getCountryStatsPerMillion(data, europeanCountriesData)}
          dataProp={dataProp}
          dataPropSecondary={dataPropSecondary}
          title={title}
        />
      )}
    </section>
  );
};

StatsPerMillion.propTypes = {
  ...SECTION_TITLE,
  ...TABLE_VIEW_DATA,
};

export default StatsPerMillion;
