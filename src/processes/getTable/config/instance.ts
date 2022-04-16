import axios from 'axios';

import { API_URL_SPREADSHETS } from '~shared/constants/api';

export const instance = axios.create({
  baseURL: API_URL_SPREADSHETS,
});