import axios from 'axios';

// Config
import { API_URL_HOST } from '~shared/constants/api';

export const instance = axios.create({
  baseURL: API_URL_HOST,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
