import { FC, ReactNode, Suspense } from 'react';

// Config
import { LOADING_TEXT } from '~shared/constants/message';

// Components
import { Header } from '~widgets/Header';
import { Spin } from 'antd';

// Styles
import cl from 'classnames';
import styles from './MainLayout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<LayoutProps> = ({ children }) => (
  <div className={cl(styles['main-layout'])}>
    <Header />
    <main className={cl(styles['main-layout__content'])}>
      <Suspense fallback={<Spin tip={LOADING_TEXT} size='large' />}>{children}</Suspense>
    </main>
  </div>
);
