import { FC } from 'react';

// Components
import { Container } from '~shared/layout/Container';
import GetTableForm from '~processes/getTableForm/GetTableForm';

// Styles
import cl from 'classnames';
import styles from './getTable.module.scss';

const GetTable: FC = () => {
  return (
    <Container className={cl(styles['get-table'])}>
      <GetTableForm />
    </Container>
  );
};

export default GetTable;
