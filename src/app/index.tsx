import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

// Components
import { Routing } from '../pages';

// Store
import { useStore } from 'effector-react';
import { $storeAuth } from '~processes/auth/model/store';
import { $storeTables } from '~processes/getTable/model/store';

// Event
import { initTableEvent } from '~processes/getTable/model/events/init';
import { setAuthStatus } from '~processes/auth/model/event/setAuthStatus';

// API
import { isAuth } from '~processes/auth/api';

// Helpers
import { initToken } from '~processes/auth/helpers/initToken';

export const App = () => {
  useStore($storeTables);
  const statusAuth = useStore($storeAuth);

  const init = async () => {
    await initToken();
    const auth = await isAuth();
    setAuthStatus(auth?.data);
  };

  useEffect(() => {
    init();
  });

  useEffect(() => {
    initTableEvent(statusAuth);
  }, [statusAuth]);

  return (
    <div className='app'>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </div>
  );
};
