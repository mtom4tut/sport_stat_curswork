import { FC, useState } from 'react';

// Styles
import cl from 'classnames';
import styles from './AuthMenu.module.scss';
import { Menu } from 'antd';

// Components

interface AuthMenuProps {
  className?: string;
  onClick: (key: string) => void;
}

export const AuthMenu: FC<AuthMenuProps> = ({ className, onClick }) => {
  const [current, setCurrent] = useState<string>('entrance');

  function handleClick(key: string) {
    setCurrent(key);
    onClick(key);
  }

  return (
    <Menu
      className={cl(className, styles['menu'])}
      onClick={e => handleClick(e.key)}
      selectedKeys={[current]}
      mode='horizontal'
    >
      <Menu.Item key='entrance'>Вход</Menu.Item>
      <Menu.Item key='registration'>Регистрация</Menu.Item>
    </Menu>
  );
};
