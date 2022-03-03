import { lazy } from 'react';
import { IRoutes } from './types';

// Pages
const GetTable = lazy(() => import('~pages/getTable'));

export const routes: IRoutes[] = [
  {
    path: '/',
    elements: GetTable,
  }
];

// доступные страницы после получения данных
export const allRoutes: IRoutes[] = [

];
