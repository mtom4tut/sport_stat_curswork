import { FC } from 'react';

export interface IRoutes {
  path: string;
  elements: FC;
}

export interface IRoutesRedirect {
  pathFrom: string;
  pathTo: string;
}