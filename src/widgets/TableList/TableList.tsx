import { FC } from 'react';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Components
import { TableItem } from '~entities/TableItem';

// Styles
import cl from 'classnames';
import styles from './TableList.module.scss';

interface TableListProps {
  className?: string;
  data: IDataTable[];
}

export const TableList: FC<TableListProps> = ({ className, data }) => {
  function getName(item: IDataTable): string {
    const elem = item.valueRanges.find(item => item.range === "'Спортсмен'!A1:Z1000");
    const elemItem = elem?.values.find((_, index) => index === 1);

    if (elemItem && elemItem[0]) {
      return elemItem[0];
    }

    return 'Имя не распознано';
  }

  return (
    <ul className={cl(className, styles['table-list'])}>
      {data.map(item => (
        <TableItem key={item.spreadsheetId} id={item.spreadsheetId} name={getName(item)} />
      ))}
    </ul>
  );
};
