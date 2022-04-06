import { lazy } from 'react';
import { IRoutes } from './types';

// Pages
const Error404 = lazy(() => import('~pages/error404'));
const AddTable = lazy(() => import('~pages/addTable'));

const Tables = lazy(() => import('~pages/tables'));

const TablesId = lazy(() => import('~pages/tablesId'));

export const routes = [
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
