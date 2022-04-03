import axios from 'axios';

// Config
import { API_URL_HOST } from '~shared/constants/api';

// Components
import { MyMessage } from '~shared/ui/MyMessage';

const instance = axios.create({
  baseURL: API_URL_HOST,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const sendMailCodeVerification = async (mail: string) => {
  try {
    const data = await instance.post<string>('/sendMailCode.php', { mail });
    if (data.status !== 200) {
      MyMessage('error', 'Ошибка', data.data);
    }
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      MyMessage('error', 'Ошибка', err.message);
    }
  }
};
