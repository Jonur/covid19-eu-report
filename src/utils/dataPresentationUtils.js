import 'fix-date';
import { MONTHS } from '../definitions/constants';

export const getHumanFormattedDate = (date) => {
  const humanDate = new Date(date);
  return `${humanDate.getDate()} ${
    MONTHS[humanDate.getMonth()][1]
  } ${humanDate.getFullYear().toString().slice(0, -2)}`;
};

export const getStatLineWidth = (entry, total) =>
  entry ? `${(entry / total) * 100}%` : 0;

export const getEUtotals = (euTotalsByDate) => {
  const dates = Object.keys(euTotalsByDate);
  const currentTotals = euTotalsByDate[dates[0]];

  return {
    current: currentTotals,
    new: {
      confirmed: currentTotals.confirmed - euTotalsByDate[dates[1]].confirmed,
      deaths: currentTotals.deaths - euTotalsByDate[dates[1]].deaths,
      recovered: currentTotals.recovered - euTotalsByDate[dates[1]].recovered,
    },
  };
};

export const formatThousands = (num) =>
  num > 0 ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';

export const getChartData = (
  piechartBg,
  trackingColour,
  trackingTitle,
  trackingValue
) => [
  {
    title: trackingTitle,
    value: trackingValue,
    color: trackingColour,
  },
  {
    title: 'World',
    value: 100 - trackingValue,
    color: piechartBg,
  },
];

export const getFormattedIncreasingValue = (value, increasingStat) =>
  `${value > 0 ? `${increasingStat ? '+' : ''}${value}` : ''}`;
