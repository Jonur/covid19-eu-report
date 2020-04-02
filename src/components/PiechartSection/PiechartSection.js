import React, { useState } from 'react';
import { SectionTitle } from '..';
import Piechart from './Piechart';
import { PIE_CHART_SECTION } from '../../definitions/propTypes';
import { getEuPercentVsRoW } from '../../utils/dataFilteringUtils';
import s from './PiechartSection.module.scss';

const PiechartSection = ({
  alerting,
  ariaLabelledBy,
  euTotals,
  sectionSubtitle,
  sectionTitle,
  worldTotals,
}) => {
  const [expandedSection, setExpandedSection] = useState(false);
  const euPercentVsRoW = getEuPercentVsRoW(worldTotals, euTotals);

  return (
    <section aria-labelledby={ariaLabelledBy} className={s.section}>
      <SectionTitle
        alerting={alerting}
        ariaLabelledBy={ariaLabelledBy}
        expandedSection={expandedSection}
        sectionSubtitle={sectionSubtitle}
        sectionTitle={sectionTitle}
        setExpandedSection={setExpandedSection}
      />
      {expandedSection && (
        <>
          <section className={s.piecharts}>
            <Piechart
              className={s.labelDeaths}
              piechartColour={s.piechartDeaths}
              title="Total deaths"
              trackingTitle="EU Deaths"
              trackingValue={euPercentVsRoW.deaths}
            />
            <Piechart
              className={s.labelConfirmed}
              piechartColour={s.piechartConfirmed}
              title="Total confirmed cases"
              trackingTitle="EU Confirmed"
              trackingValue={euPercentVsRoW.confirmed}
            />
            <Piechart
              className={s.labelRecovered}
              piechartColour={s.piechartRecovered}
              title="Total recovered patients"
              trackingTitle="EU Recovered"
              trackingValue={euPercentVsRoW.recovered}
            />
          </section>
        </>
      )}
    </section>
  );
};

PiechartSection.propTypes = PIE_CHART_SECTION;

export default PiechartSection;
