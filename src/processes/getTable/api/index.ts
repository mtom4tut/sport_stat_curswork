// Config
import { API_KEY_SPREADSHETS } from '~shared/constants/api';

// Helpers
import { parseLists } from '../helpers/parseList';

// Components
import { MyMessage } from '~shared/ui/MyMessage';
import { instance } from '../config/instance';

export const getTableLists = async <T>(id: string, listsName: string[]) => {
  const data = await instance.get<T>(`${id}/values:batchGet?key=${API_KEY_SPREADSHETS}${parseLists(listsName)}`);

  return data.data;
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
