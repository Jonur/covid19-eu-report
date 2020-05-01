import axios from 'axios';
import { API_ENDPOINTS } from '../definitions/constants';

const getApiData = async () =>
  await axios.get(API_ENDPOINTS.COVID_19).then(({ data }) => data);

export default getApiData;
