import { FC } from 'react';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Styles
import cl from 'classnames';
import styles from './TableContent.module.scss';

// Utils
import { getName } from '~shared/utils/getName';

// Components
import { Tabs } from 'antd';
import { Table } from '~entities/Table';
import { TableTotal } from '~entities/TableTotal';
import { PDFDownload, TablesIdPDF } from '~features/PDFDownload';
const { TabPane } = Tabs;

interface TableListProps {
  className?: string;
  data: IDataTable;
}

export const TableContent: FC<TableListProps> = ({ className, data }) => {
  function parseNameTable(str: string): string {
    return str.slice(1).split("'")[0];
  }

  return (
    <div className={cl(className, styles['table-content'])}>
      <Tabs defaultActiveKey='0'>
        {data.valueRanges.map((item, index) => (
          <TabPane tab={parseNameTable(item.range)} key={index}>
            <Table data={item.values} />
          </TabPane>
        ))}

        <TabPane tab='Итоги' key='99999'>
          <TableTotal data={data} />
        </TabPane>
      </Tabs>

      <div className={cl(styles['table-content__pdf'])}>
        <PDFDownload Template={<TablesIdPDF data={data} />} filename={getName(data).replace(' ', '_')} />
      </div>
    </div>
  );
};
