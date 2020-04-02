import React, { useState } from 'react';
import ReactSvgPieChart from 'react-svg-piechart';
import { SectionTitle } from '..';
import { getEuPercentVsRoW } from '../../utils/dataFilteringUtils';
import s from './PiechartSection.module.scss';

const PiechartSection = ({
  alerting,
  ariaLabelledBy,
  sectionSubtitle,
  sectionTitle,
  worldTotals,
  euTotals,
}) => {
  const [expandedSection, setExpandedSection] = useState(false);
  const euPercentVsRoW = getEuPercentVsRoW(worldTotals, euTotals);
  const chartDataDeaths = [
    {
      title: 'EU deaths',
      value: euPercentVsRoW.deaths,
      color: s.piechartDeaths,
    },
    { title: 'World', value: 100 - euPercentVsRoW.deaths, color: s.piechartBg },
  ];
  const chartDataConfirmed = [
    {
      title: 'EU Confirmed',
      value: euPercentVsRoW.confirmed,
      color: s.piechartConfirmed,
    },
    {
      title: 'World',
      value: 100 - euPercentVsRoW.confirmed,
      color: s.piechartBg,
    },
  ];
  const chartDataRecovered = [
    {
      title: 'EU Recovered',
      value: euPercentVsRoW.recovered,
      color: s.piechartRecovered,
    },
    {
      title: 'World',
      value: 100 - euPercentVsRoW.recovered,
      color: s.piechartBg,
    },
  ];

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
            <section className={s.piechartContainer}>
              <h3 className={s.piechartTitle}>Total deaths</h3>
              <div className={s.piechart}>
                <ReactSvgPieChart
                  data={chartDataDeaths}
                  expandSize={0}
                  strokeWidth={0}
                  startAngle={-90}
                />
                <ul className={s.piechartDetails}>
                  <li
                    className={s.labelDeaths}
                  >{`EU (${chartDataDeaths[0].value}%)`}</li>
                  <li>World</li>
                </ul>
              </div>
            </section>
            <section className={s.piechartContainer}>
              <h3 className={s.piechartTitle}>Total confirmed cases</h3>
              <div className={s.piechart}>
                <ReactSvgPieChart
                  data={chartDataConfirmed}
                  expandSize={0}
                  strokeWidth={0}
                  startAngle={-90}
                />
                <ul className={s.piechartDetails}>
                  <li
                    className={s.labelConfirmed}
                  >{`EU (${chartDataConfirmed[0].value}%)`}</li>
                  <li>World</li>
                </ul>
              </div>
            </section>
            <section className={s.piechartContainer}>
              <h3 className={s.piechartTitle}>Total recovered patients</h3>
              <div className={s.piechart}>
                <ReactSvgPieChart
                  data={chartDataRecovered}
                  expandSize={0}
                  strokeWidth={0}
                  startAngle={-90}
                />
                <ul className={s.piechartDetails}>
                  <li
                    className={s.labelRecovered}
                  >{`EU (${chartDataRecovered[0].value}%)`}</li>
                  <li>World</li>
                </ul>
              </div>
            </section>
          </section>
        </>
      )}
    </section>
  );
};

export default PiechartSection;
