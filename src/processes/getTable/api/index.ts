// Config
import { API_KEY_SPREADSHETS } from '~shared/constants/api';

// Helpers
import { parseLists } from '../helpers/parseList';

// Components
import { instance } from '../config/instance';

export const getTableLists = async <T>(id: string, listsName: string[]) => {
  const data = await instance.get<T>(`${id}/values:batchGet?key=${API_KEY_SPREADSHETS}${parseLists(listsName)}`);

  return data.data;
};
