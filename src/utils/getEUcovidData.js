import axios from 'axios';
import { DATA_URL, EU_COUNTRIES } from '../definitions/constants';

const getEUcovidData = () =>
  axios.get(DATA_URL).then(({ data }) =>
    Object.keys(data).reduce((euCountries, country) => {
      if (EU_COUNTRIES.includes(country)) {
        return {
          ...euCountries,
          [country]: data[country],
        };
      }
      return euCountries;
    }, {})
  );

export default getEUcovidData;
