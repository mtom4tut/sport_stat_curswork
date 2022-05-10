import { lazy } from 'react';
import { IRoutes } from './types';

// Pages
const Error404 = lazy(() => import('~pages/error404'));
const AddTable = lazy(() => import('~pages/addTable'));

const Tables = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return import('~pages/tables');
});

const TablesId = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 550));
  return import('~pages/tablesId');
});

export const routes: IRoutes[] = [
  {
    path: '/',
    elements: AddTable,
  },
  {
    path: '/tables',
    elements: Tables,
  },
  {
    path: '/tables/:id',
    elements: TablesId,
  },
  {
    path: '*',
    elements: Error404,
  },
];
