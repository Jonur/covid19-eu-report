import React from 'react';
import ReactSvgPieChart from 'react-svg-piechart';
import { PIE_CHART } from '../../definitions/propTypes';
import { getChartData } from '../../utils/dataPresentationUtils';
import s from './PiechartSection.module.scss';

const Piechart = ({
  className,
  piechartColour,
  title,
  trackingTitle,
  trackingValue,
}) => {
  const chartData = getChartData(
    s.piechartBg,
    piechartColour,
    trackingTitle,
    trackingValue
  );

  return (
    <section className={s.piechartContainer}>
      <h3 className={s.piechartTitle}>{title}</h3>
      <div className={s.piechart}>
        <ReactSvgPieChart
          data={chartData}
          expandSize={0}
          strokeWidth={0}
          startAngle={-90}
        />
        <ul className={s.piechartDetails}>
          <li className={className}>{`EU (${chartData[0].value}%)`}</li>
          <li>World</li>
        </ul>
      </div>
    </section>
  );
};

Piechart.propTypes = PIE_CHART;

export default Piechart;
