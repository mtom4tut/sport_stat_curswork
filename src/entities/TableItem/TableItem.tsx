import { FC } from 'react';
import { useNavigate } from 'react-router';

// Styles
import cl from 'classnames';
import styles from './TableItem.module.scss';

interface TableItemProps {
  className?: string;
  id: string;
  name: string;
}

export const TableItem: FC<TableItemProps> = ({ className, id, name }) => {
  const navigate = useNavigate()

  return (
    <li className={cl(className, styles['list-item'])} onClick={() => navigate(`/tables/${id}`)}>
      <div className={cl(styles['list-item__id'])}>
        <span>ID таблицы:&#160;</span>
        <span>{id}</span>
      </div>
      <div className={cl(styles['list-item__name'])}>
        <span>ФИО: </span>
        <span>{name}</span>
      </div>
    </li>
  );
};
