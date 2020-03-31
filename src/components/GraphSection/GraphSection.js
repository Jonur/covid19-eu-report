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
              <input name="displayDeaths" type="checkbox" /> <span>Deaths</span>
            </label>
            <label className={s.displayCofirmed}>
              <input name="displayConfirmed" type="checkbox" />{' '}
              <span>Confirmed cases</span>
            </label>
            <label className={s.displayRecovered}>
              <input name="displayRecovered" type="checkbox" />{' '}
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
                  <GraphSectionLine
                    className={s.danger}
                    self={graphData[date].deaths}
                    total={totals.deaths}
                  />
                  <GraphSectionLine
                    className={s.warning}
                    self={graphData[date].confirmed}
                    total={totals.confirmed}
                  />
                  <GraphSectionLine
                    className={s.success}
                    self={graphData[date].recovered}
                    total={totals.recovered}
                  />
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
