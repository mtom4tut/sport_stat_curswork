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

export const addTableId = async (id: string) => {
  try {
    const data = await instance.post<string>('/addSpreadsheets.php', { id });
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

export const removeTableId = async (id: string) => {
  try {
    const data = await instance.post<string>('/removeSpreadsheets.php', { id });
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

export const getTableId = async () => {
  try {
    const data = await instance.get<string[]>('/getSpreadsheets.php');
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

export const insertDataTotal = async (
  id: string,
  name_sportsmen: string,
  weight_sportsmen: number,
  age_sportsmen: number,
  date_passing: string,
  aerobic_p_legs: number,
  aerobic_p_args: number,
  heart_rate_aerobic_legs: number,
  heart_rate_aerobic_args: number,
  anaerobic_p_legs: number,
  anaerobic_p_args: number,
  heart_rate_anaerobic_legs: number,
  heart_rate_anaerobic_args: number,
  mpk_legs: number,
  mpk_args: number,
  yoc_max_legs: number,
  yoc_max_args: number
) => {
  try {
    const data = await instance.post<string>('/insertTotal.php', {
      id,
      name_sportsmen,
      weight_sportsmen,
      age_sportsmen,
      date_passing,
      aerobic_p_legs,
      aerobic_p_args,
      heart_rate_aerobic_legs,
      heart_rate_aerobic_args,
      anaerobic_p_legs,
      anaerobic_p_args,
      heart_rate_anaerobic_legs,
      heart_rate_anaerobic_args,
      mpk_legs,
      mpk_args,
      yoc_max_legs,
      yoc_max_args,
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
