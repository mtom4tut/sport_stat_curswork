import { createEvent } from 'effector';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

export const resetTableEvent = createEvent<string>();

export function reset(state: IDataTable[]) {
  state = []
  return state;
}
