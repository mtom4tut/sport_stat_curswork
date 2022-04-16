import { createStore } from 'effector';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Event
import { init, initTableEvent } from './events/init';
import { add, addTableEvent } from './events/add';
import { removeTableEvent, remove } from './events/remove';

export const $storeTables = createStore<IDataTable[]>([])
  .on(initTableEvent, (state, spreadsheetId: string[]) => init(spreadsheetId))
  .on(addTableEvent, (state, data: IDataTable) => add(state, data))
  .on(removeTableEvent, (state, spreadsheetId: string) => remove(state, spreadsheetId));
