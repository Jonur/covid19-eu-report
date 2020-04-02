import React from 'react';
import ReactSvgPieChart from 'react-svg-piechart';
import s from './PiechartSection.module.scss';

export const getChartData = (piechartColour, trackingTitle, trackingValue) => [
  {
    title: trackingTitle,
    value: trackingValue,
    color: piechartColour,
  },
  {
    title: 'World',
    value: 100 - trackingValue,
    color: s.piechartBg,
  },
];

const Piechart = ({
  className,
  title,
  piechartColour,
  trackingTitle,
  trackingValue,
}) => {
  const chartData = getChartData(piechartColour, trackingTitle, trackingValue);

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

export default Piechart;
