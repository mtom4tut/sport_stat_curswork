import axios from 'axios';

// Config
import { API_KEY_SPREADSHETS, API_URL_SPREADSHETS } from '~shared/constants/api';

const instance = axios.create({
  baseURL: API_URL_SPREADSHETS,
});

function parseLists(listsName: string[]) {
  let str = '';

  listsName.forEach(item => {
    str += `&ranges=${item}`;
  });

  return str;
}

export const getTableLists = async <T>(id: string, listsName: string[]) => {
  const data = await instance.get<T>(`${id}/values:batchGet?key=${API_KEY_SPREADSHETS}${parseLists(listsName)}`);

  return data.data;
};
