import { Result } from 'antd';
import { FC } from 'react';

// Store
import { useStore } from 'effector-react';
import { $storeTables } from '~processes/getTable/model/store';

// Components
import { Container } from '~shared/layout/Container';
import { TableList } from '~widgets/TableList';

const Tables: FC = () => {
  const tables = useStore($storeTables);

  return <Container>{tables.length ? <TableList data={tables} /> : <Result title='Пусто...' />}</Container>;
};

export default Tables;
