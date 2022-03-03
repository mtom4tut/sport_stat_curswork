import { ReactElement } from 'react';

import { MainLayout } from './MainLayout';

export function getLayout(page: ReactElement): ReactElement {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  );
}
