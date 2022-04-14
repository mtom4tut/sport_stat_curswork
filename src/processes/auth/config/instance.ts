import axios from 'axios';

// Config
import { API_URL_HOST } from '~shared/constants/api';

// Helpers
import { getToken } from '../helpers/getToken';

export const instance = axios.create({
  baseURL: API_URL_HOST,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

async function initToken() {
  instance.defaults.headers.common['X-CSRF-Token'] = await getToken();
}

initToken()