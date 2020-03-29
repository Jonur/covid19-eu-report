import axios from 'axios';
import getEUcovidData from './getEUcovidData';

jest.mock('axios');

describe('getEUcovidData', () => {
  const response = {
    data: {
      Greece: {},
      China: {},
    },
  };

  it('should fetch the data from the API filtering out the non EU countries', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(response));
    await expect(getEUcovidData()).resolves.toEqual({ Greece: {} });
  });
});
