import React, { Fragment, useState } from 'react';
import GraphSectionLine from './GraphSectionLine';
import { GRAPH_SECTION } from '../../definitions/propTypes';
import { SectionTitle } from '..';
import { getHumanFormattedDate } from '../../utils/graphUtils';
import s from './GraphSection.module.scss';

const GraphSection = ({
  ariaLabelledBy,
  graphData,
  sectionSubtitle,
  sectionTitle,
  alerting,
  totals,
}) => {
  const [expandedSection, setExpandedSection] = useState(false);
  const [optionDisplayed, setOptionsDisplayed] = useState({
    confirmed: true,
    deaths: true,
    recovered: true,
  });
  const handleChange = event =>
    setOptionsDisplayed({
      ...optionDisplayed,
      [event.target.name]: event.target.checked,
    });

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
        <>
          <div className={s.displayOptions}>
            <label className={s.displayDeaths}>
              <input
                name="deaths"
                type="checkbox"
                value={optionDisplayed.deaths}
                checked={optionDisplayed.deaths}
                onChange={handleChange}
              />{' '}
              <span>Deaths</span>
            </label>
            <label className={s.displayCofirmed}>
              <input
                name="confirmed"
                type="checkbox"
                value={optionDisplayed.confirmed}
                checked={optionDisplayed.confirmed}
                onChange={handleChange}
              />{' '}
              <span>Confirmed cases</span>
            </label>
            <label className={s.displayRecovered}>
              <input
                name="recovered"
                type="checkbox"
                value={optionDisplayed.recovered}
                checked={optionDisplayed.recovered}
                onChange={handleChange}
              />{' '}
              <span>Recovered</span>
            </label>
          </div>
          <dl className={s.graphData}>
            {Object.keys(graphData).map(date => (
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
