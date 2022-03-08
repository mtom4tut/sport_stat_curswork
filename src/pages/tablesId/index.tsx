import { FC } from 'react';
import { useParams } from 'react-router';

// Store
import { useStore } from 'effector-react';
import { $storeTables } from '~processes/getTable/model/store';

// Config
import { IBreadcrumb } from '~shared/ui/MyBreadcrumb/model/types';

// Components
import { Result } from 'antd';
import { Container } from '~shared/layout/Container';
import { MyBreadcrumb } from '~shared/ui/MyBreadcrumb';
import { TableContent } from '~widgets/TableContent';

// Styles
import cl from 'classnames';
import styles from './TablesId.module.scss';

const TablesId: FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const tables = useStore($storeTables);
  const data = tables.find(item => item.spreadsheetId === id);

  const BREADCRUMBS: IBreadcrumb[] = [
    {
      text: 'Таблицы',
      link: '/tables',
    },
    {
      text: id,
    },
  ];

  return (
    <Container className={cl(styles['tables-id'])}>
      <MyBreadcrumb className={cl(styles['tables-id__breadcrumb'])} breadcrumbs={BREADCRUMBS} />
      {data ? <TableContent data={data} /> : <Result title='Пусто...' />}
    </Container>
  );
};

export default TablesId;
