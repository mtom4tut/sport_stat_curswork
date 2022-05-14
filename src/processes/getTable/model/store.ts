import { createStore } from 'effector';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Event
import { init, initTableEvent } from './events/init';
import { add, addTableEvent } from './events/add';
import { removeTableEvent, remove } from './events/remove';
import { reset, resetTableEvent } from './events/reset';

export const $storeTables = createStore<IDataTable[]>([])
  .on(initTableEvent, (state, data: IDataTable) => init(state, data))
  .on(addTableEvent, (state, data: IDataTable) => add(state, data))
  .on(removeTableEvent, (state, spreadsheetId: string) => remove(state, spreadsheetId))
  .on(resetTableEvent, (state: IDataTable[]) => reset(state));
