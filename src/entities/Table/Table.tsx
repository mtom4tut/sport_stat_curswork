import { FC } from 'react';

// Styles
import cl from 'classnames';
import styles from './Table.module.scss';

interface TableProps {
  className?: string;
  data: [][];
}

export const Table: FC<TableProps> = ({ className, data }) => {
  return (
    <div className={cl(className, styles['table'])}>
      {data.map((row, i) => (
        <div key={i} className={styles['table__row']}>
          {row.map((col, j) => (
            <div key={j} className={styles['table__col']}>
              {col}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
