import { createEvent } from 'effector';

// Interface
import { IDataTable } from '~features/addTableForm/model/types';

// Components
import { MyMessage } from '~shared/ui/MyMessage';

export const initTableEvent = createEvent<IDataTable>();

export function init(state: IDataTable[], data: IDataTable) {
  try {
      state.push(data);

      // добавить данные в localstore
      const storage = localStorage.getItem('tableId')
      let tableId: string[] = storage ? JSON.parse(storage) : [];
      tableId.push(data.spreadsheetId);

      const isEmpty = tableId.find(item => item === data.spreadsheetId);

      if(!isEmpty && localStorage.getItem('auth') === 'false') {
        localStorage.setItem('tableId', JSON.stringify(tableId));
      }

      return state;
  } catch (err: unknown) {
    if (err instanceof Error) {
      MyMessage('error', 'Ошибка', err.message);
    }
  }
}
