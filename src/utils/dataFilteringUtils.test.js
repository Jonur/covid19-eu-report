import * as utils from './dataFilteringUtils';

describe('dataFilteringUtils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getWorldTotals', () => {
    it('should return the Object with the world totals', () => {
      const result = utils.getWorldTotals({
        Greece: [{ confirmed: 10, deaths: 10, recovered: 10 }],
        Italy: [{ confirmed: 20, deaths: 20, recovered: 20 }],
      });

      expect(result).toEqual({ confirmed: 30, deaths: 30, recovered: 30 });
    });
  });

  describe('getFormattedPercentage', () => {
    it('should return a percentage result as a float number with up to two decimal digits', () => {
      const result = utils.getFormattedPercentage(2323, 90120);
      expect(result).toBe(2.58);
    });
  });

  describe('getEuPercentVsRoW', () => {
    it('should return an Object of percentage results', () => {
      const result = utils.getEuPercentVsRoW(
        { confirmed: 150, deaths: 150, recovered: 150 },
        { confirmed: 20, deaths: 20, recovered: 20 }
      );
      expect(result).toEqual({
        confirmed: 13.33,
        deaths: 13.33,
        recovered: 13.33,
      });
    });
  });

  describe('getEUCovidData', () => {
    it('should return the EU country results from a data set', () => {
      const result = utils.getEUCovidData({
        Greece: [{ confirmed: 10, deaths: 10, recovered: 10 }],
        China: [{ confirmed: 20, deaths: 20, recovered: 20 }],
      });
      expect(result).toEqual({
        Greece: [{ confirmed: 10, deaths: 10, recovered: 10 }],
      });
    });
  });

  describe('getCountryFlagURL', () => {
    it('should return the correct flag URL for the given country', () => {
      const result = utils.getCountryFlagURL('Greece');
      expect(result).toBe('https://www.countryflags.io/gr/flat/32.png');
    });

    it('should return en empty String for falsy or non matching data', () => {
      const result = utils.getCountryFlagURL('');
      expect(result).toBe('');
    });
  });

  describe('getTotalPropOfCountry', () => {
    it('should return the property of the last element of the country data', () => {
      const result = utils.getTotalPropOfCountry(
        [{ population: 10 }, { population: 20 }],
        'population'
      );
      expect(result).toBe(20);
    });

    it('should return 0 for falsy data or there was no prop match', () => {
      const result = utils.getTotalPropOfCountry([], 'population');
      expect(result).toBe(0);
    });
  });

  describe('getTotalPropOfCountryYesterday', () => {
    it('should return the property of the second-to-last element of the country data', () => {
      const result = utils.getTotalPropOfCountryYesterday(
        [{ population: 10 }, { population: 20 }],
        'population'
      );
      expect(result).toBe(10);
    });

    it('should return 0 for falsy data or there was no prop match', () => {
      const result = utils.getTotalPropOfCountryYesterday([], 'population');
      expect(result).toBe(0);
    });
  });

  describe('getCountiesTotalsDate', () => {
    const getCountryFlagURLSpy = jest.spyOn(utils, 'getCountryFlagURL');
    const getTotalPropOfCountrySpy = jest.spyOn(utils, 'getTotalPropOfCountry');
    const getTotalPropOfCountryYesterdaySpy = jest.spyOn(
      utils,
      'getTotalPropOfCountryYesterday'
    );

    it('should return an Object with the totals of a country', () => {
      getCountryFlagURLSpy.mockReturnValue('23.png');
      getTotalPropOfCountrySpy.mockReturnValue(100);
      getTotalPropOfCountryYesterdaySpy.mockReturnValue(90);

      const result = utils.getCountiesTotalsDate({
        Greece: [{ deaths: 100, confirmed: 100, recovered: 100 }],
      });
      expect(result).toEqual([
        {
          casesLast24h: 100,
          countryName: 'Greece',
          deathsLast24h: 100,
          flagSrc: 'https://www.countryflags.io/gr/flat/32.png',
          recoveredLast24h: 100,
          totalCases: 100,
          totalDeaths: 100,
          totalRecovered: 100,
        },
      ]);
    });

    it('should return an Object with the totals of a former EU country', () => {
      getCountryFlagURLSpy.mockReturnValue('23.png');
      getTotalPropOfCountrySpy.mockReturnValue(100);
      getTotalPropOfCountryYesterdaySpy.mockReturnValue(90);

      const result = utils.getCountiesTotalsDate({
        'United Kingdom': [{ deaths: 100, confirmed: 100, recovered: 100 }],
      });
      expect(result[0]).toEqual(
        expect.objectContaining({ countryName: 'United Kingdom*' })
      );
    });
  });

  describe('getSortedColumns', () => {
    const data = [
      { men: 20, women: 50 },
      { men: 60, women: 30 },
    ];

    it('should return a result sorted by the indicated column in an ascending order', () => {
      const result = utils.getSortedColumns(data, 'men', false);
      expect(result).toEqual([
        { men: 20, women: 50 },
        { men: 60, women: 30 },
      ]);
    });

    it('should return a result sorted by the indicated column in an descending order', () => {
      const result = utils.getSortedColumns(data, 'men', true);
      expect(result).toEqual([
        { men: 60, women: 30 },
        { men: 20, women: 50 },
      ]);
    });
  });

  describe('getSortedColumnsStatii', () => {
    it('should set all properies of an Object to `false` and toggle the indicited one', () => {
      const result = utils.getSortedColumnsStatii('isOpen', false, {
        isOpen: false,
        isClosed: true,
        isBlue: true,
      });
      expect(result).toEqual({ isOpen: true, isClosed: false, isBlue: false });
    });
  });

  describe('sortCountriesDataByColumn', () => {
    const data = [
      { men: 20, women: 50 },
      { men: 60, women: 30 },
    ];
    const statii = {
      isOpen: true,
      isBlue: false,
    };
    const setSortedColumns = jest.fn();
    const setCountriesData = jest.fn();

    it('should call the given functions with the sorted data', () => {
      utils.sortCountriesDataByColumn(
        'isBlue',
        data,
        statii,
        setSortedColumns,
        setCountriesData
      );

      expect(setSortedColumns).toHaveBeenCalledWith({
        isBlue: true,
        isOpen: false,
      });
      expect(setCountriesData).toHaveBeenCalledWith(data);
    });
  });

  describe('getLastUpdateFromData', () => {
    const data = { jack: [{ date: '1995-02-05' }] };

    it('should return the last date in the data in the right format', () => {
      const result = utils.getLastUpdateFromData(data);
      expect(result).toBe('5 Feb 95');
    });

    it('should return an empty String for invalid or falsy data', () => {
      const result = utils.getLastUpdateFromData();
      expect(result).toBe('');
    });
  });

  describe('getAllRecordsDates', () => {
    it('should get all data dates from the first EU result', () => {
      const result = utils.getAllRecordsDates({
        Austria: [{ date: '2020-11-5' }, { date: '2020-12-5' }],
        Greece: [{ date: '2020-12-15' }, { date: '2020-12-15' }],
      });

      expect(result).toEqual(['2020-11-5', '2020-12-5']);
    });
  });

  describe('getEUTotalsByDate', () => {
    it('should get all EU totals and organise them by date', () => {
      const result = utils.getEUTotalsByDate({
        Austria: [
          { confirmed: 10, deaths: 10, recovered: 10, date: '2020-12-5' },
        ],
        Italy: [
          { confirmed: 20, deaths: 20, recovered: 20, date: '2020-12-5' },
        ],
      });

      expect(result).toEqual({
        '2020-12-5': { confirmed: 30, deaths: 30, recovered: 30 },
      });
    });
  });

  describe('getEUTotalsByDateNewestFirst', () => {
    it('should return the EU totals and organise them in a descending date order', () => {
      const result = utils.getEUTotalsByDateNewestFirst({
        Austria: [
          { confirmed: 10, deaths: 10, recovered: 10, date: '2020-12-5' },
          { confirmed: 20, deaths: 20, recovered: 20, date: '2020-5-2' },
        ],
        Italy: [
          { confirmed: 10, deaths: 10, recovered: 10, date: '2020-12-5' },
          { confirmed: 20, deaths: 20, recovered: 20, date: '2020-5-2' },
        ],
      });

      expect(result).toEqual({
        '2020-12-5': {
          confirmed: 20,
          deaths: 20,
          recovered: 20,
        },
        '2020-5-2': {
          confirmed: 40,
          deaths: 40,
          recovered: 40,
        },
      });
    });
  });
});
