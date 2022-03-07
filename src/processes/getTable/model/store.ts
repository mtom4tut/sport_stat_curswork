import { useStore } from 'effector-react';
import { createStore } from 'effector';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Event
import { add, addTableEvent } from './event';

export const $storeTables = createStore<IDataTable[]>([]).on(addTableEvent, (state, data: IDataTable) => {
  add(state, data);
});
