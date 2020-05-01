import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../definitions/constants';
import getApiData from './getApiData';

const apiMocks = new MockAdapter(axios);

describe('getApiData', () => {
  const covid19data = {
    data: {
      China: {},
      Greece: {},
      Italy: {},
    },
  };
  const europeanCountriesData = {
    data: {
      Greece: {},
      Italy: {},
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the data from the API filtering out the non EU countries', async () => {
    apiMocks
      .onGet(API_ENDPOINTS.COVID_19)
      .reply(200, covid19data)
      .onGet(API_ENDPOINTS.EUROPEAN_COUNTRIES)
      .reply(200, europeanCountriesData);

    await expect(getApiData()).resolves.toEqual({
      covid19data: {
        data: {
          China: {},
          Greece: {},
          Italy: {},
        },
      },
      europeanCountriesData: {
        data: {
          Greece: {},
          Italy: {},
        },
      },
    });
  });
});
