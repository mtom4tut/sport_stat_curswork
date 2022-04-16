import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

// Components
import { Routing } from '../pages';
import { Spin } from 'antd';

// Store
import { useStore } from 'effector-react';
import { $storeAuth } from '~processes/auth/model/store';
import { $storeTables } from '~processes/getTable/model/store';

// Event
import { initTableEvent } from '~processes/getTable/model/events/init';
import { setAuthStatus } from '~processes/auth/model/event/setAuthStatus';

// API
import { getTableId, isAuth } from '~processes/auth/api';

// Config
import { LOADING_TEXT } from '~shared/constants/message';

// Helpers
import { initToken } from '~processes/auth/helpers/initToken';
import { useFetching } from '~shared/hooks/useFetching';

export const App = () => {
  useStore($storeTables);
  const statusAuth = useStore($storeAuth);

  const [fetchInit, isLoading] = useFetching(init);

  async function init() {
    await initToken();
    const auth = await isAuth();
    if (auth?.data) {
      const dataTableId = await getTableId();
      initTableEvent(dataTableId?.data ? dataTableId?.data : []);
    } else {
      initTableEvent([]);
    }
    setAuthStatus(auth?.data);
  }

  useEffect(() => {
    let abortController = new AbortController();
    fetchInit();
    return () => {
      abortController.abort();
    };
  }, [statusAuth]);

  return (
    <div className='app'>
      <BrowserRouter>{isLoading ? <Spin tip={LOADING_TEXT} size='large' /> : <Routing />}</BrowserRouter>
    </div>
  );
};
