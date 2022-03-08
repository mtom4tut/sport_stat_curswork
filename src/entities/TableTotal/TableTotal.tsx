import { FC } from 'react';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Styles
import cl from 'classnames';
import styles from './TableTotal.module.scss';

interface TableTotalProps {
  className?: string;
  data: IDataTable;
}

export const TableTotal: FC<TableTotalProps> = ({ className }) => {
  return (
    <div className={cl(className, styles['table-total'])}>
      jghjhgfjhjghj
    </div>
  );
};
