import { createEvent } from 'effector';

// Interface
import { IDataTable } from '~features/addTableForm/model/types';

// Config
import { listNameTable } from '~processes/getTable/config/listNameTable';

// Api
import { getTableLists } from '~processes/getTable/api';

export const initTableEvent = createEvent<string[]>();

export function init(tableId: string[]) {
  const state: IDataTable[] = [];

  // получаем данные из lockalstorage
  if (localStorage.getItem('auth') === 'false' && localStorage.getItem('tableId')) {
    tableId = JSON.parse(localStorage.getItem('tableId')!);
  }

  tableId.map(async id => {
    const data = await getTableLists<IDataTable>(id, listNameTable);
    state.push(data);
  });

  return state;
}
