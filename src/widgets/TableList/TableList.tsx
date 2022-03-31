import { FC } from 'react';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Components
import { TableItem } from '~entities/TableItem';
import { Input } from 'antd';

// Styles
import cl from 'classnames';
import styles from './TableList.module.scss';
import { useState } from 'react';

interface TableListProps {
  className?: string;
  data: IDataTable[];
}

export const TableList: FC<TableListProps> = ({ className, data }) => {
  const [filterData, setFilterData] = useState<IDataTable[]>(data);

  function getName(item: IDataTable): string {
    const elem = item.valueRanges.find(item => item.range === "'Спортсмен'!A1:Z1000");
    const elemItem = elem?.values.find((_, index) => index === 1);

    if (elemItem && elemItem[0]) {
      return elemItem[0];
    }

    return 'Имя не распознано';
  }

  function filteredData(val: string) {
    if (val) {
      val = val.toLowerCase();
      const filter = data.filter(
        item => item.spreadsheetId.toLowerCase().includes(val) || getName(item).toLowerCase().includes(val)
      );
      setFilterData(filter);
    } else {
      setFilterData(data);
    }
  }

  return (
    <div>
      <Input allowClear placeholder='Начните вводить id таблицы или ФИО спортсмена' onChange={e => filteredData(e.target.value)} />
      <ul className={cl(className, styles['table-list'])}>
        {filterData.map(item => (
          <TableItem key={item.spreadsheetId} id={item.spreadsheetId} name={getName(item)} />
        ))}
      </ul>
    </div>
  );
};
