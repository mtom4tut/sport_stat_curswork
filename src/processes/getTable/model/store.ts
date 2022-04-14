import { createStore } from 'effector';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Event
import { add, addTableEvent } from './events/add';
import { initStore } from '../config/initStore';
import { removeTableEvent, remove } from './events/remove';

export const $storeTables = createStore<IDataTable[]>(initStore())
  .on(addTableEvent, (state, data: IDataTable) => add(state, data))
  .on(removeTableEvent, (state, spreadsheetId: string) => remove(state, spreadsheetId));
