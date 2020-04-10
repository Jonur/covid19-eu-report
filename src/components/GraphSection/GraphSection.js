import React, { useState } from 'react';
import GraphSectionResult from './GraphSectionResult';
import { GRAPH_SECTION } from '../../definitions/propTypes';
import { SectionTitle } from '..';
import s from './GraphSection.module.scss';

const GraphSection = ({
  alerting,
  ariaLabelledBy,
  graphData,
  icon,
  sectionSubtitle,
  sectionTitle,
  totals,
}) => {
  const [expandedSection, setExpandedSection] = useState(false);
  const [optionDisplayed, setOptionsDisplayed] = useState({
    confirmed: true,
    deaths: true,
    recovered: true,
  });
  const handleChange = (event) =>
    setOptionsDisplayed({
      ...optionDisplayed,
      [event?.target?.name ?? '']: event?.target?.checked ?? false,
    });

  return (
    <section aria-labelledby={ariaLabelledBy} className={s.section}>
      <SectionTitle
        alerting={alerting}
        ariaLabelledBy={ariaLabelledBy}
        expandedSection={expandedSection}
        icon={icon}
        sectionSubtitle={sectionSubtitle}
        sectionTitle={sectionTitle}
        setExpandedSection={setExpandedSection}
      />
      {expandedSection && (
        <GraphSectionResult
          graphData={graphData}
          handleChange={handleChange}
          optionDisplayed={optionDisplayed}
          totals={totals}
        />
      )}
    </section>
  );
};

GraphSection.propTypes = GRAPH_SECTION;

export default GraphSection;
