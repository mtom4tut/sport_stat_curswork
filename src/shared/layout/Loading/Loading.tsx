import { FC, Fragment, ReactNode } from 'react';

// Config
import { LOADING_TEXT } from '~shared/constants/message';

// Components
import { Alert, Spin } from 'antd';

interface LoadingProps {
  isLoading: boolean;
  error: string;
  children: ReactNode;
}

export const Loading: FC<LoadingProps> = ({ isLoading, error, children }) => {
  let element: ReactNode = (
    <Alert message='Ошибка' description={'Произошла ошибка ' + error + '.'} type='error' showIcon />
  );
  if (!error) {
    element = children;
  }

  return <Fragment>{isLoading ? <Spin tip={LOADING_TEXT} size='large' /> : element}</Fragment>;
};
