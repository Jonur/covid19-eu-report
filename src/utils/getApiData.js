import axios from 'axios';
import { API_ENDPOINTS } from '../definitions/constants';

const getCOVID19data = () => axios.get(API_ENDPOINTS.COVID_19);
const getEuropeanCountriesData = () =>
  axios.get(API_ENDPOINTS.EUROPEAN_COUNTRIES);

const getApiData = async () =>
  await axios
    .all([getCOVID19data(), getEuropeanCountriesData()])
    .then(
      axios.spread((covid19data, europeanCountriesData) => ({
        covid19data: covid19data.data,
        europeanCountriesData: europeanCountriesData.data,
      }))
    )
    .catch((e) => ({ error: true, errordetails: e }));

export default getApiData;
