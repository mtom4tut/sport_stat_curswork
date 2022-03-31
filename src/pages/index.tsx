import { Routes, Route } from 'react-router-dom';
import { routes } from '~shared/routes';

// Store
import { useStore } from 'effector-react';
import { $storeTables } from '~processes/getTable/model/store';

// Components
import { getLayout } from '~shared/layout/MainLayout';

export const Routing = () => {
  useStore($storeTables);
  return getLayout(
    <Routes>
      {routes.map(route => (
        <Route key={route.path} path={route.path} element={<route.elements />} />
      ))}
    </Routes>
  );
};
