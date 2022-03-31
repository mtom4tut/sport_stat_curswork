import { createEvent } from 'effector';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Components
import { MyMessage } from '~shared/ui/MyMessage';

export const addTableEvent = createEvent<IDataTable>();

export function add(state: IDataTable[], data: IDataTable) {
  try {
    const isEmpty = state.find(item => item.spreadsheetId === data.spreadsheetId);
    if (isEmpty) {
      MyMessage('warning', 'Предупреждение', 'Данная таблица уже добавлена.');
    } else {
      state.push(data);
      
      // добавить данные в localstore
      let tableId: string[] = localStorage.getItem('tableId') ? JSON.parse(localStorage.getItem('tableId')!) : [];
      tableId.push(data.spreadsheetId);
      localStorage.setItem('tableId', JSON.stringify(tableId));

      MyMessage('success', 'Выполнено', 'Таблица успешно добавлена.');
      return state;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      MyMessage('error', 'Ошибка', err.message);
    }
  }
}

export const removeTableEvent = createEvent<string>();

export function remove(state: IDataTable[], spreadsheetId: string) {
  try {
    console.log(state);

    state = state.filter(item => item.spreadsheetId !== spreadsheetId);
    const spreadsheetIdArr: string[] = state.map(item => item.spreadsheetId);
    localStorage.setItem('tableId', JSON.stringify(spreadsheetIdArr));
    MyMessage('success', 'Выполнено', 'Таблица успешно удалена.');
    return state;
  } catch (err: unknown) {
    if (err instanceof Error) {
      MyMessage('error', 'Ошибка', err.message);
    }
  }
}
