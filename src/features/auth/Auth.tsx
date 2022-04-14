import { FC, useEffect, useMemo, useState } from 'react';

// Styles
import cl from 'classnames';
import styles from './Auth.module.scss';

// API
import { registration } from '~processes/auth/api';

// Components
import { Button, Form, Modal } from 'antd';
import { AuthLogin } from './ui/AuthLogin';
import { AuthPassword } from './ui/AuthPassword';
import { AuthMenu, DEFAULT_MENU_ITEM, menuItems } from './ui/AuthMenu';
import { MyMessage } from '~shared/ui/MyMessage';

// Hooks
import { useFetching } from '~shared/hooks/useFetching';

// Interface
import { IForm } from './interface/IForm';

interface AuthProps {
  className?: string;
}

export const Auth: FC<AuthProps> = ({ className }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // модальное окно

  const [menu, setMenu] = useState<string>(DEFAULT_MENU_ITEM); // активный пункт меню
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  const formInputs: IForm = { login: '', code: '', password: '', passwordCheck: '' }; // Инициализация полей формы
  const [valueInputs, setValueInputs] = useState<IForm>(formInputs); // State формы

  const [fetchReg, isLoading] = useFetching(fetching); // Хук для обработки API запроса

  const handleCancel = () => {
    setIsModalVisible(false);
    document.forms.namedItem('authForm')?.reset(); // сброс формы
  };

  // callback функция
  async function fetching() {
    const data = await registration(
      valueInputs.login,
      valueInputs.code,
      valueInputs.password,
      valueInputs.passwordCheck
    );

    if (data?.data) {
      MyMessage('error', 'Ошибка', String(data.data));
    } else {
      // заполнить стор...!!!!
      handleCancel();
      MyMessage('success', 'Выполнено', 'Аккаунт успешно создан');
    }
  }

  // сработает по событию submit если форма заполнена без ошибок
  const onFinish = (values: IForm) => {
    setValueInputs(values);
  };

  useEffect(() => {
    setIsRegistration(menuItems.registration === menu);
    document.forms.namedItem('authForm')?.reset(); // сброс формы
  }, [menu]);

  // вызов функции для обработки API
  useMemo(() => {
    if (valueInputs.code) {
      fetchReg();
    }
  }, [valueInputs]);

  return (
    <>
      <Button className={cl(className, styles['auth'])} onClick={() => setIsModalVisible(true)}>
        <svg xmlns='http://www.w3.org/2000/svg' version='1.0' viewBox='0 0 512 512'>
          <path d='M221 1.6c-22.9 4.9-43.1 24.6-48.4 47.4-2.2 9.2-2.2 39.6-.1 44.8 6.4 15.2 27.3 17.2 37 3.4 3-4.4 3-4.4 3.5-21.5.6-18.5 1.6-22.2 7.2-27.4 5.6-5.3 5.8-5.3 61-5.2h51.3l-5.5 2.1c-11.2 4.2-19.2 11.7-24.4 22.7l-3.1 6.6-.3 165.3-.2 165.3-35.9-.3-35.9-.3-4.4-3c-2.3-1.7-5.4-5.1-6.8-7.5-2.5-4.4-2.5-5-3-32-.5-29.9-.7-30.5-6.7-36.2-10.3-9.8-26.7-6.7-33.4 6.4-1.7 3.4-1.9 6.1-1.9 32 0 31.9.6 36.3 6.8 48.8 5.3 10.9 16.8 22.2 28.2 27.9 13.4 6.6 17.4 7.1 57.8 7.1H299v14.3c0 9.8.5 15.9 1.5 19.3 2.3 7.9 8.6 16.8 15.5 21.8 8.3 6.1 14.5 8.1 25.5 8.1h9l67-22.4c36.9-12.3 69.2-23.5 71.9-24.8 5.8-2.9 13.2-10.1 16.9-16.3 6-10.4 5.7 2.1 5.7-212.7 0-139.8-.3-197.7-1.1-201.5C507.5 17.7 493.6 4.1 477 1c-3.4-.6-49.2-1-127.4-.9C249.1.1 226.3.4 221 1.6z' />
          <path d='M119.5 108.4c-4 1.7-9.5 7.2-11.1 11.3-1.1 2.5-1.4 10.9-1.4 37.7v34.5l-46.3.3-46.3.3-4.2 2.8c-6 3.9-9.3 9.4-9.9 16.4-.7 8 3.1 15.4 10.2 19.8l4.8 3 45.9.3 45.8.3v34.2c0 30.9.2 34.6 1.9 38.2 4.8 10.7 18.6 15.5 28.9 10.1 1.5-.8 23.5-22.3 48.8-47.8 43.5-43.7 46.2-46.6 47.3-51.1 1.4-5.8.7-10.9-2.4-16.2-3.6-6.1-90.2-92.1-94.7-93.9-4.5-1.9-13.2-2-17.3-.2z' />
        </svg>
        <span className={cl(styles['auth-text'])}>Войти</span>
      </Button>
      {/* <Button>Выйти</Button> */}

      <Modal className={cl(styles['auth-modal'])} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <AuthMenu onClick={setMenu} />

        <Form name='authForm' className={cl(styles['auth-modal__form'])} autoComplete='off' onFinish={onFinish}>
          <AuthLogin className={cl(styles['auth-modal__input'])} registrationMod={isRegistration} />

          <AuthPassword className={cl(styles['auth-modal__input'])} registrationMod={isRegistration} />

          {isRegistration && (
            <AuthPassword className={cl(styles['auth-modal__input'])} registrationMod={true} name='passwordCheck' />
          )}

          <Button
            loading={isLoading}
            className={cl(styles['auth-modal__submit'])}
            type='primary'
            size='large'
            htmlType='submit'
          >
            {isRegistration ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </Form>
      </Modal>
    </>
  );
};
