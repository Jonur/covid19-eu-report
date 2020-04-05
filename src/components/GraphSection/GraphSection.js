import React, { Fragment, useState } from 'react';
import GraphSectionLine from './GraphSectionLine';
import GraphSectionOptionControl from './GraphSectionOptionControl';
import { GRAPH_SECTION } from '../../definitions/propTypes';
import { SectionTitle } from '..';
import { getHumanFormattedDate } from '../../utils/dataPresentationUtils';
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
        <>
          <div className={s.displayOptions}>
            <GraphSectionOptionControl
              property="deaths"
              optionDisplayed={optionDisplayed}
              handleChange={handleChange}
              label="Deaths"
            />
            <GraphSectionOptionControl
              property="confirmed"
              optionDisplayed={optionDisplayed}
              handleChange={handleChange}
              label="Confirmed"
            />
            <GraphSectionOptionControl
              property="recovered"
              optionDisplayed={optionDisplayed}
              handleChange={handleChange}
              label="Recovered"
            />
          </div>
          <dl className={s.graphData}>
            {Object.keys(graphData).map((date) => (
              <Fragment key={date}>
                <dt className={s.graphDateEntry}>
                  {getHumanFormattedDate(date)}
                </dt>
                <dd className={s.graphDateData}>
                  {optionDisplayed.deaths && (
                    <GraphSectionLine
                      className={s.danger}
                      self={graphData[date].deaths}
                      total={totals.deaths}
                    />
                  )}
                  {optionDisplayed.confirmed && (
                    <GraphSectionLine
                      className={s.warning}
                      self={graphData[date].confirmed}
                      total={totals.confirmed}
                    />
                  )}
                  {optionDisplayed.recovered && (
                    <GraphSectionLine
                      className={s.success}
                      self={graphData[date].recovered}
                      total={totals.recovered}
                    />
                  )}
                </dd>
              </Fragment>
            ))}
          </dl>
        </>
      )}
    </section>
  );
};

GraphSection.propTypes = GRAPH_SECTION;

export default GraphSection;
