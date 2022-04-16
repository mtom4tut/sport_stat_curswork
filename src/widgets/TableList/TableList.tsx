import { FC, useMemo } from 'react';
import { useState } from 'react';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Components
import { TableItem } from '~entities/TableItem';
import { Input } from 'antd';
import { PDFDownload, TablesPDF } from '~features/PDFDownload';

// Utils
import { getName } from '~shared/utils/getName';

// Styles
import cl from 'classnames';
import styles from './TableList.module.scss';

interface TableListProps {
  className?: string;
  data: IDataTable[];
}

export const TableList: FC<TableListProps> = ({ className, data }) => {
  const [filterData, setFilterData] = useState<IDataTable[]>(data);

  useMemo(() => {
    setFilterData(data);
  }, [data]);

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
      <div className={cl(styles['table-list-header'])}>
        <Input
          allowClear
          placeholder='Начните вводить id таблицы или ФИО спортсмена'
          onChange={e => filteredData(e.target.value)}
        />
        <PDFDownload Template={<TablesPDF data={filterData} />} />
      </div>
      <ul className={cl(className, styles['table-list'])}>
        {filterData.map(item => (
          <TableItem key={item.spreadsheetId} id={item.spreadsheetId} name={getName(item)} />
        ))}
      </ul>
    </div>
  );
};
