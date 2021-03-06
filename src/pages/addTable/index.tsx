import { FC } from 'react';

// Components
import { Container } from '~shared/layout/Container';
import { AddTableForm } from '~features/addTableForm';

// Styles
import cl from 'classnames';
import styles from './addTable.module.scss';

const AddTable: FC = () => {
  return (
    <Container className={cl(styles['get-table'])}>
      <AddTableForm />
    </Container>
  );
};

export default AddTable;
