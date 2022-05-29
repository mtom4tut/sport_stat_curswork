import { FC, useEffect, useMemo, useState } from 'react';

// Styles
import cl from 'classnames';
import styles from './Auth.module.scss';

// API
import { authorization, logOutAccount, registration } from '~processes/auth/api';

// Store
import { useStore } from 'effector-react';
import { $storeAuth } from '~processes/auth/model/store';

// Event
import { setAuthStatus } from '~processes/auth/model/event/setAuthStatus';
import { resetTableEvent } from '~processes/getTable/model/events/reset';

// Components
import { Button, Form, Modal } from 'antd';
import { AuthLogin } from './ui/AuthLogin';
import { AuthPassword } from './ui/AuthPassword';
import { AuthMenu, MENU_ITEMS } from './ui/AuthMenu';
import { MyMessage } from '~shared/ui/MyMessage';

// Hooks
import { useFetching } from '~shared/hooks/useFetching';

// Interface
import { IForm } from './interface/IForm';
import { formInputs } from './config/formInputs';

interface AuthProps {
  className?: string;
}

export const Auth: FC<AuthProps> = ({ className }) => {
  const statusAuth = useStore($storeAuth);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // модальное окно

  const [menu, setMenu] = useState<string>(MENU_ITEMS.authorization); // активный пункт меню

  const [valueInputs, setValueInputs] = useState<IForm>(formInputs); // State формы

  const [fetchAuth, isLoading] = useFetching(fetching); // Хук для обработки API запроса
  const [fetchLogOut, isLoadingLogOut] = useFetching(logOut); // Хук для обработки API запроса

  const handleCancel = () => {
    setIsModalVisible(false);
    document.forms.namedItem('authForm')?.reset(); // сброс формы
  };

  async function logOut() {
    await logOutAccount();
    setAuthStatus(false);
    resetTableEvent('');
  }

  // callback функция
  async function fetching() {
    let data;

    switch (menu) {
      case MENU_ITEMS.authorization:
        data = await authorization(valueInputs.login, valueInputs.password);
        break;

      case MENU_ITEMS.registration:
        data = await registration(valueInputs.login, valueInputs.code, valueInputs.password, valueInputs.passwordCheck);
        break;

      default:
        MyMessage('error', 'Ошибка', 'Такой пункт меню отсутствует');
        break;
    }

    if (data?.data) {
      MyMessage('error', 'Ошибка', String(data.data));
      return;
    } else if (menu === MENU_ITEMS.registration) {
      MyMessage('success', 'Выполнено', 'Аккаунт успешно создан');
    }

    resetTableEvent('');
    setAuthStatus(true);
    handleCancel();
  }

  // сработает по событию submit если форма заполнена без ошибок
  const onFinish = (values: IForm) => {
    setValueInputs(values);
  };

  useEffect(() => {
    document.forms.namedItem('authForm')?.reset(); // сброс формы
  }, [menu]);

  // вызов функции для обработки API
  useMemo(() => {
    if (valueInputs.password) {
      fetchAuth();
    }
  }, [valueInputs]);

  return (
    <>
      {statusAuth ? (
        <Button className={cl(className, styles['auth'])} onClick={fetchLogOut} loading={isLoadingLogOut}>
          <svg xmlns='http://www.w3.org/2000/svg' version='1.0' viewBox='0 0 512 512'>
            <path d='M32 1.4C17.3 5.5 5.3 17.6 1.4 32.4.3 36.6 0 70.8 0 234.5 0 450.2-.3 437.6 5.7 448c3.7 6.2 11.1 13.4 16.9 16.3 2.7 1.3 35 12.5 71.9 24.8l67 22.4h9c11 0 17.2-2 25.5-8.1 6.7-4.9 12.1-12.3 15-20.7 1.6-4.6 2-8.2 2-20.2V448h35.3c40.2 0 44.2-.5 57.7-7.1 16.2-7.9 29.3-24.4 33.4-41.9 2.3-9.7 2.3-103.3.1-108.8-6.7-16-29.9-17-38.3-1.7-1.5 2.6-1.8 8.9-2.2 52l-.5 49-2.5 4.5c-1.4 2.4-4.5 5.8-6.8 7.5l-4.4 3-35.9.3-35.9.3-.2-165.3-.3-165.3-3.2-6.7c-5.2-11-12.2-17.5-24.2-22.5l-5.6-2.3 52.7.3 52.6.2 4.4 3c2.3 1.7 5.4 5.1 6.8 7.5l2.5 4.5.5 38.5c.5 37.7.5 38.6 2.7 42.1 1.3 2 4.2 4.9 6.5 6.5 3.7 2.6 5 2.9 11.8 2.9 6.7 0 8.1-.3 11.6-2.7 2.1-1.5 5-4.4 6.4-6.5l2.5-3.7.3-39.7c.3-44.8 0-47.5-6.6-60.9-5.4-11-16.8-22.3-28.2-27.9-15.2-7.4-8-7.1-146-7C64.3.2 35.5.5 32 1.4z' />
            <path d='M396.5 108.9c-5.1 2.3-10.1 7.9-11.4 12.8-.7 2.3-1.1 16.9-1.1 37V192h-89.6l-5.3 2.6c-9 4.5-13.4 14-11 23.8 1.6 6.7 8.5 13.8 15.1 15.4 3.2.8 18.1 1.2 47.7 1.2H384v33.1c0 23.4.4 34.4 1.2 37.3 2.5 8.1 11.8 14.6 20.9 14.6 8-.1 10.7-2.4 56.7-48.3 46.1-46 49.2-49.7 49.2-57.5 0-9.5.6-8.8-47.9-57.5-30.1-30.1-47-46.4-49.7-47.7-5.1-2.5-12.6-2.5-17.9-.1z' />
          </svg>
          <span className={cl(styles['auth-text'])}>Выйти</span>
        </Button>
      ) : (
        <Button className={cl(className, styles['auth'])} onClick={() => setIsModalVisible(true)}>
          <svg xmlns='http://www.w3.org/2000/svg' version='1.0' viewBox='0 0 512 512'>
            <path d='M221 1.6c-22.9 4.9-43.1 24.6-48.4 47.4-2.2 9.2-2.2 39.6-.1 44.8 6.4 15.2 27.3 17.2 37 3.4 3-4.4 3-4.4 3.5-21.5.6-18.5 1.6-22.2 7.2-27.4 5.6-5.3 5.8-5.3 61-5.2h51.3l-5.5 2.1c-11.2 4.2-19.2 11.7-24.4 22.7l-3.1 6.6-.3 165.3-.2 165.3-35.9-.3-35.9-.3-4.4-3c-2.3-1.7-5.4-5.1-6.8-7.5-2.5-4.4-2.5-5-3-32-.5-29.9-.7-30.5-6.7-36.2-10.3-9.8-26.7-6.7-33.4 6.4-1.7 3.4-1.9 6.1-1.9 32 0 31.9.6 36.3 6.8 48.8 5.3 10.9 16.8 22.2 28.2 27.9 13.4 6.6 17.4 7.1 57.8 7.1H299v14.3c0 9.8.5 15.9 1.5 19.3 2.3 7.9 8.6 16.8 15.5 21.8 8.3 6.1 14.5 8.1 25.5 8.1h9l67-22.4c36.9-12.3 69.2-23.5 71.9-24.8 5.8-2.9 13.2-10.1 16.9-16.3 6-10.4 5.7 2.1 5.7-212.7 0-139.8-.3-197.7-1.1-201.5C507.5 17.7 493.6 4.1 477 1c-3.4-.6-49.2-1-127.4-.9C249.1.1 226.3.4 221 1.6z' />
            <path d='M119.5 108.4c-4 1.7-9.5 7.2-11.1 11.3-1.1 2.5-1.4 10.9-1.4 37.7v34.5l-46.3.3-46.3.3-4.2 2.8c-6 3.9-9.3 9.4-9.9 16.4-.7 8 3.1 15.4 10.2 19.8l4.8 3 45.9.3 45.8.3v34.2c0 30.9.2 34.6 1.9 38.2 4.8 10.7 18.6 15.5 28.9 10.1 1.5-.8 23.5-22.3 48.8-47.8 43.5-43.7 46.2-46.6 47.3-51.1 1.4-5.8.7-10.9-2.4-16.2-3.6-6.1-90.2-92.1-94.7-93.9-4.5-1.9-13.2-2-17.3-.2z' />
          </svg>
          <span className={cl(styles['auth-text'])}>Войти</span>
        </Button>
      )}

      <Modal className={cl(styles['auth-modal'])} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <AuthMenu onClick={setMenu} />

        <Form name='authForm' className={cl(styles['auth-modal__form'])} autoComplete='off' onFinish={onFinish}>
          <AuthLogin className={cl(styles['auth-modal__input'])} registrationMod={menu === MENU_ITEMS.registration} />

          <AuthPassword
            className={cl(styles['auth-modal__input'])}
            registrationMod={menu === MENU_ITEMS.registration}
          />

          {menu === MENU_ITEMS.registration && (
            <AuthPassword placeholder="Введите пароль еще раз" className={cl(styles['auth-modal__input'])} registrationMod={true} name='passwordCheck' />
          )}

          <Button
            loading={isLoading}
            className={cl(styles['auth-modal__submit'])}
            type='primary'
            size='large'
            htmlType='submit'
          >
            {menu === MENU_ITEMS.registration ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </Form>
      </Modal>
    </>
  );
};
