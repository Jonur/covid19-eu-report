import axios from 'axios';
import { DATA_URL } from '../definitions/constants';

const getApiData = async () =>
  await axios.get(DATA_URL).then(({ data }) => data);

export default getApiData;
