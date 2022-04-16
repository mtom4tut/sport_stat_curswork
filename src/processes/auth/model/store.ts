import { createStore } from 'effector';

// Event
import { setAuthStatus } from './event/setAuthStatus';

export const $storeAuth = createStore<boolean>(localStorage.getItem('auth') === 'true').on(
  setAuthStatus,
  (state, status: boolean) => {
    localStorage.setItem('auth', String(status));
    return status;
  }
);
