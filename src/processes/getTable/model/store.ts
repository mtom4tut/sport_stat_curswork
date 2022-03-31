import { createStore } from 'effector';

// Config
import { IDataTable } from '~features/addTableForm/model/types';
import { getTableLists } from '../api';

// Event
import { add, addTableEvent } from './event';

function fetching() {
  let dataArr: IDataTable[] = [];

  // получаем данные из lockalstorage
  if (localStorage.getItem('tableId')) {
    const tableId: string[] = JSON.parse(localStorage.getItem('tableId')!);

    tableId.map(async id => {
      const data = await getTableLists<IDataTable>(id, ['Спортсмен', 'Ноги', 'Плечевой пояс']);
      await dataArr.push(data);
    });
  }

  return dataArr;
}

const initStore = fetching();


export const $storeTables = createStore<IDataTable[]>(initStore).on(addTableEvent, (state, data: IDataTable) => {
  add(state, data);
});
