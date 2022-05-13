import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

// Components
import { Routing } from '../pages';
import { Spin } from 'antd';

// Store
import { useStore } from 'effector-react';
import { $storeAuth } from '~processes/auth/model/store';

// Event
import { initTableEvent } from '~processes/getTable/model/events/init';

// API
import { getTableId, isAuth } from '~processes/auth/api';

// Config
import { IDataTable } from '~features/addTableForm/model/types';
import { listNameTable } from '~processes/getTable/config/listNameTable';
import { LOADING_TEXT } from '~shared/constants/message';

// Hook
import { useFetching } from '~shared/hooks/useFetching';

// Helpers
import { initToken } from '~processes/auth/helpers/initToken';
import { getTableLists } from '~processes/getTable/api';

export const App = () => {
  const statusAuth = useStore($storeAuth);

  const [fetchInit, isLoading] = useFetching(init);

  async function init() {
    await initToken();
    const auth = await isAuth();
    let dataTableId: string[];

    if (auth?.data) {
      const data = await getTableId();
      dataTableId = data?.data ? data?.data : []
    } else {
      const storage = localStorage.getItem('tableId')
      dataTableId = storage ? JSON.parse(storage) : [];
    }

    await Promise.all(dataTableId.map(async id => {
      const data = await getTableLists<IDataTable>(id, listNameTable);
      initTableEvent(data);
    }));
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
