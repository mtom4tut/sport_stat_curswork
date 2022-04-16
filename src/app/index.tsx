import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
import { getTableId, isAuth } from '~processes/auth/api';

// Helpers
import { initToken } from '~processes/auth/helpers/initToken';

export const App = () => {
  useStore($storeTables);
  const statusAuth = useStore($storeAuth);
  const [tableId, setTableId] = useState<string[]>([]);

  const init = async () => {
    await initToken();
    const auth = await isAuth();
    const dataTableId = await getTableId();
    setTableId(dataTableId?.data ? dataTableId?.data : []);
    setAuthStatus(auth?.data);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    initTableEvent(tableId);
  }, [statusAuth, tableId]);

  return (
    <div className='app'>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </div>
  );
};
