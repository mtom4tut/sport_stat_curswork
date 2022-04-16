import { createEvent } from 'effector';

// Interface
import { IDataTable } from '~features/addTableForm/model/types';

// Config
import { listNameTable } from '~processes/getTable/config/listNameTable';

// Api
import { getTableLists } from '~processes/getTable/api';

export const initTableEvent = createEvent<boolean>();

export function init(status: boolean) {
  const state: IDataTable[] = [];
  // получаем данные из lockalstorage
  if (!status && localStorage.getItem('tableId')) {
    const tableId: string[] = JSON.parse(localStorage.getItem('tableId')!);

    tableId.map(async id => {
      const data = await getTableLists<IDataTable>(id, listNameTable);
      state.push(data);
    });
  }

  return state;
}
