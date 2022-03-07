import { FC } from 'react';

// Components
import { Container } from '~shared/layout/Container';
import { AddTableForm } from '~features/addTableForm';

// Store
import { useStore } from 'effector-react';
import { $storeTables } from '~processes/getTable/model/store';

// Styles
import cl from 'classnames';
import styles from './addTable.module.scss';

const AddTable: FC = () => {
  const tables = useStore($storeTables);
  return (
    <Container className={cl(styles['get-table'])}>
      <AddTableForm />
    </Container>
  );
};

export default AddTable;
