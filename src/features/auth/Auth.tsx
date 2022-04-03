import { FC, useState } from 'react';

// Styles
import cl from 'classnames';
import styles from './Auth.module.scss';

// Components
import { Button, Form, Menu, Modal } from 'antd';

// Interface
import { IForm } from './interface/IForm';
import { AuthLogin } from './ui/AuthLogin';
import { AuthPassword } from './ui/AuthPassword';
import { AuthMenu } from './ui/AuthMenu';

interface AuthProps {
  className?: string;
}

export const Auth: FC<AuthProps> = ({ className }) => {
  const formInputs: IForm = { login: '', password: '', passwordCheck: '' }; // Инициализация полей формы
  const [valueInputs, setValueInputs] = useState<IForm>(formInputs); // State формы
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleCancel = () => {
    setIsModalVisible(false);

    document.forms.namedItem('authForm')?.reset(); // сброс формы
  };

  const onFinish = () => {
    setIsModalVisible(false);

    document.forms.namedItem('authForm')?.reset(); // сброс формы
  };

  return (
    <div className={cl(className, styles['auth'])}>
      <Button onClick={() => setIsModalVisible(true)}>Войти</Button>
      {/* <Button>Выйти</Button> */}
      {/* isModalVisible */}
      <Modal visible={true} onCancel={handleCancel} footer={null}>
        <AuthMenu />

        <Form
          name='authForm'
          className={cl(className, styles['auth__form'])}
          action='/php/auth.php'
          method='post'
          autoComplete='off'
          onFinish={onFinish}
        >
          <AuthLogin className={cl(styles['auth__input'])} />

          <AuthPassword className={cl(styles['auth__input'])} />

          <Button className={cl(styles['auth__submit'])} type='primary' size='large' htmlType='submit'>
            Войти
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
