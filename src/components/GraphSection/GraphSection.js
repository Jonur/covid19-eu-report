import React, { useState } from 'react';
import GraphLinesDataList from './GraphLinesDataList';
import GraphDisplayOptions from './GraphDisplayOptions';
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
        <div className={s.graphStatsContainer}>
          <GraphDisplayOptions
            optionDisplayed={optionDisplayed}
            handleChange={handleChange}
          />
          <GraphLinesDataList
            graphData={graphData}
            optionDisplayed={optionDisplayed}
            totals={totals}
          />
        </div>
      )}
    </section>
  );
};

GraphSection.propTypes = GRAPH_SECTION;

export default GraphSection;
