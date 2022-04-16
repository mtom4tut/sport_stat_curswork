// Config
import { instance } from '../config/instance';

// Components
import { MyMessage } from '~shared/ui/MyMessage';

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

export const registration = async (mail: string, code: string, password: string, passwordCheck: string) => {
  try {
    const data = await instance.post<string>('/registration.php', {
      mail,
      code,
      password,
      passwordCheck,
    });
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

export const authorization = async (mail: string, password: string) => {
  try {
    const data = await instance.post<string>('/authorization.php', {
      mail,
      password,
    });
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

export const isAuth = async () => {
  try {
    const data = await instance.get('/isAuth.php');
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

export const logOutAccount = async () => {
  try {
    const data = await instance.get<string>('/logout.php');
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
