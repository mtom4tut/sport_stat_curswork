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
      MyMessage('success', 'Выполнено', 'Таблица успешно добавлена.');
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      MyMessage('error', 'Ошибка', err.message);
    }
  }
}
