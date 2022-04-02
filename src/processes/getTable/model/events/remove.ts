import { createEvent } from 'effector';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Components
import { MyMessage } from '~shared/ui/MyMessage';

export const removeTableEvent = createEvent<string>();

export function remove(state: IDataTable[], spreadsheetId: string) {
  try {
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
