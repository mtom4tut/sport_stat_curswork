import { lazy } from 'react';
import { IRoutes } from './types';

// Pages
const AddTable = lazy(() => import('~pages/addTable'));

export const routes: IRoutes[] = [
  {
    path: '/',
    elements: AddTable,
  }
];

// доступные страницы после получения данных
export const allRoutes: IRoutes[] = [

];
