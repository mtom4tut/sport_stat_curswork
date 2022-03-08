import { FC } from 'react';

// Config
import { IDataTable } from '~features/addTableForm/model/types';

// Styles
import cl from 'classnames';
import styles from './TableContent.module.scss';

// Components
import { Tabs } from 'antd';
const { TabPane } = Tabs;

interface TableListProps {
  className?: string;
  data: IDataTable;
}

export const TableContent: FC<TableListProps> = ({ className, data }) => {
  function parseNameTable(str: string): string {
    return str.slice(1).split('\'')[0];
  }

  return (
    <div className={cl(className, styles['table-content'])}>
      <Tabs defaultActiveKey='1'>
        {data.valueRanges.map((item, index) => (
          <TabPane tab={parseNameTable(item.range)} key={index}>
            Content of Tab Pane 1
          </TabPane>
        ))}

        <TabPane tab='Итоги' key='99999'>
            Content of Tab Pane 1
        </TabPane>
      </Tabs>
    </div>
  );
};
