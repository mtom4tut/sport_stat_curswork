import { FC, useState } from 'react';

// Styles
import cl from 'classnames';
import styles from './Auth.module.scss';

// Components
import { Button, Form, Input, Modal, Tabs } from 'antd';
const { TabPane } = Tabs;

interface AuthProps {
  className?: string;
}

export const Auth: FC<AuthProps> = ({ className }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);

    document.forms.namedItem('authForm')?.reset(); // сброс формы
  };

  return (
    <div className={cl(className, styles['auth'])}>
      <Button onClick={showModal}>Войти</Button>
      {/* <Button>Выйти</Button> */}

      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form name='authForm' action='/php/auth.php' method='post'>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Вход' key='1'>
              <Input className={cl(styles['auth__input'])} placeholder='Введите логин' />
              <Input.Password className={cl(styles['auth__input'])} placeholder='Введите пароль' />
            </TabPane>

            <TabPane tab='Регистрация' key='2'>
              <Input className={cl(styles['auth__input'])} placeholder='Введите логин' />
              <Input.Password className={cl(styles['auth__input'])} placeholder='Введите пароль' />
              <Input.Password className={cl(styles['auth__input'])} placeholder='Подтвердите пароль' />
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    </div>
  );
};
