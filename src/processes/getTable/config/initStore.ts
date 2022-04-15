// Config
import { listNameTable } from './listNameTable';

// Interface
import { IDataTable } from '~features/addTableForm/model/types';

// Api
import { getTableLists } from '~processes/getTable/api';

export function initStore() {
  const state: IDataTable[] = [];
  // получаем данные из lockalstorage
  if (localStorage.getItem('tableId')) {
    const tableId: string[] = JSON.parse(localStorage.getItem('tableId')!);

    tableId.map(async id => {
      const data = await getTableLists<IDataTable>(id, listNameTable);
      state.push(data);
    });
  }

  return state;
}
