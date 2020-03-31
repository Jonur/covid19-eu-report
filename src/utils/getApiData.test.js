import axios from 'axios';
import getApiData from './getApiData';

jest.mock('axios');

describe('getApiData', () => {
  const response = {
    data: {
      China: {},
      Greece: {},
    },
  };

  it('should fetch the data from the API filtering out the non EU countries', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(response));
    await expect(getApiData()).resolves.toEqual({ China: {}, Greece: {} });
  });
});
