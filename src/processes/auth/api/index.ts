import axios from 'axios';

// Config
import { API_URL_HOST } from '~shared/constants/api';

// Components
import { MyMessage } from '~shared/ui/MyMessage';

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL_HOST,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const sendMailCodeVerification = async (mail: string) => {
  try {
    const data = await instance.post<string>('/sendMailCode.php', { mail });
    if (data.status !== 200) {
      MyMessage('error', 'Ошибка', String(data.status));
    } else if (data.data.length > 50) {
      data.data = 'Ошибка сервера, попробуйте позже!';
    }
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      MyMessage('error', 'Ошибка', err.message);
    }
  }
};

export const mailVerificationCode = async (mail: string, code: string) => {
  try {
    const data = await instance.post<string>('/codeVerification.php', { mail, code });
    if (data.status !== 200) {
      MyMessage('error', 'Ошибка', String(data.status));
    }
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      MyMessage('error', 'Ошибка', err.message);
    }
  }
};
