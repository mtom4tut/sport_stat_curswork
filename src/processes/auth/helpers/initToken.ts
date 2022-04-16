import { instance } from '../config/instance';

import { getToken } from './getToken';

export async function initToken() {
  instance.defaults.headers.common['X-CSRF-Token'] = await getToken();
}
