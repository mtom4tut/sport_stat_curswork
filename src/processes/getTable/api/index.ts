import axios from 'axios';

// Config
import { API_KEY_SPREADSHETS } from '~shared/constants/api';

export const getTableList = async (id: string, listName: string) => {
  const data = await axios.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${id}/values:batchGet?key=${API_KEY_SPREADSHETS}&ranges=${listName}`
  );

  return data.data;
};
