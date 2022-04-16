import { FC } from 'react';
import { useNavigate } from 'react-router';

// API
import { removeTableId } from '~processes/auth/api';

// Store
import { useStore } from 'effector-react';
import { $storeAuth } from '~processes/auth/model/store';

// Event
import { removeTableEvent } from '~processes/getTable/model/events/remove';

// Components
import { Button } from 'antd';
import { MyMessage } from '~shared/ui/MyMessage';

// Styles
import cl from 'classnames';
import styles from './TableItem.module.scss';

interface TableItemProps {
  className?: string;
  id: string;
  name: string;
}

export const TableItem: FC<TableItemProps> = ({ className, id, name }) => {
  const navigate = useNavigate();
  const statusAuth = useStore($storeAuth);

  async function remove(id: string) {
    let err: string | undefined = '';
    if (statusAuth) {
      const data = await removeTableId(id);
      err = data?.data;
    }

    if (err) {
      MyMessage('error', 'Ошибка', err);
    } else {
      removeTableEvent(id);
    }
  }

  return (
    <li className={cl(className, styles['list-item'])}>
      <div onClick={() => navigate(`/tables/${id}`)}>
        <div className={cl(styles['list-item__id'])}>
          <span>ID таблицы:&#160;</span>
          <span>{id}</span>
        </div>
        <div className={cl(styles['list-item__name'])}>
          <span>ФИО: </span>
          <span>{name}</span>
        </div>
      </div>
      <Button type='ghost' danger shape='round' onClick={() => remove(id)}>
        Удалить
      </Button>
    </li>
  );
};
