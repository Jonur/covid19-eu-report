import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { CURVE_LINES } from '../../definitions/propTypes';
import { lineChart } from '../../media/index.scss';

const CurveLineChart = ({ data, lineDataKey, containerRef }) => (
  <LineChart
    width={(containerRef?.current?.offsetWidth ?? 0) - 34}
    height={300}
    data={data}
    margin={{ left: -20, bottom: 32, top: 16 }}
    fontSize={12}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" reversed />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey={lineDataKey} stroke={lineChart} />
  </LineChart>
);

CurveLineChart.propTypes = CURVE_LINES;

export default CurveLineChart;
