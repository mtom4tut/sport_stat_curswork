import { FC, ReactNode } from 'react';

// Styles
import cl from 'classnames';
import styles from './Container.module.scss';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ className, children }) => (
  <div className={cl(className, styles['container'])}>{children}</div>
);
