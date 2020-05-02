import {
  formatThousands,
  getChartData,
  getEUtotals,
  getFormattedIncreasingValue,
  getHumanFormattedDate,
  getStatLineWidth,
} from './dataPresentationUtils';

describe('dataPresentationUtils', () => {
  describe('getHumanFormattedDate', () => {
    it('should return a given YYYY-MM-DD type date and convert it to a literal format', () => {
      const result = getHumanFormattedDate('2020-5-3');
      expect(result).toBe('3 May 20');
    });
  });

  describe('getStatLineWidth', () => {
    it('return the width for statistic presenation line', () => {
      const result = getStatLineWidth(60, 1200);
      expect(result).toBe('5%');
    });
  });

  describe('getEUtotals', () => {
    const euTotals = {
      '2020-12-5': { confirmed: 30, deaths: 30, recovered: 30 },
      '2020-12-4': { confirmed: 20, deaths: 30, recovered: 20 },
    };

    it('return EU totals by selecting the result of the newest entry', () => {
      const result = getEUtotals(euTotals);
      expect(result).toEqual({
        current: {
          confirmed: 30,
          deaths: 30,
          recovered: 30,
        },
        new: {
          confirmed: 10,
          deaths: 0,
          recovered: 10,
        },
      });
    });
  });

  describe('formatThousands', () => {
    it('return a number with the thousands separator', () => {
      const result = formatThousands(123654);
      expect(result).toBe('123,654');
    });
  });

  describe('getChartData', () => {
    it('return the chart data in the right format', () => {
      const result = getChartData('white', 'black', 'New', 27);
      expect(result).toEqual([
        {
          color: 'black',
          title: 'New',
          value: 27,
        },
        {
          color: 'white',
          title: 'World',
          value: 73,
        },
      ]);
    });
  });

  describe('getFormattedIncreasingValue', () => {
    it('should return a formatted positive value of an increasing stat', () => {
      const result = getFormattedIncreasingValue(50, true);
      expect(result).toBe('+50');
    });

    it('should return a formatted positive value of an non increasing stat', () => {
      const result = getFormattedIncreasingValue(50, false);
      expect(result).toBe('50');
    });

    it('should return an empty String for a negative or 0 value', () => {
      const result = getFormattedIncreasingValue(-50, true);
      expect(result).toBe('');
    });
  });
});
