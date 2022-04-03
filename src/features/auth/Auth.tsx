import { FC, useEffect, useState } from 'react';

// Styles
import cl from 'classnames';
import styles from './Auth.module.scss';

// Components
import { Button, Form, Modal } from 'antd';
import { AuthLogin } from './ui/AuthLogin';
import { AuthPassword } from './ui/AuthPassword';
import { AuthMenu, DEFAULT_MENU_ITEM, menuItems } from './ui/AuthMenu';

// Config

// Interface
import { IForm } from './interface/IForm';

interface AuthProps {
  className?: string;
}

export const Auth: FC<AuthProps> = ({ className }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // модальное окно

  const handleCancel = () => {
    setIsModalVisible(false);
    document.forms.namedItem('authForm')?.reset(); // сброс формы
  };

  const [menu, setMenu] = useState<string>(DEFAULT_MENU_ITEM); // активный пункт меню
  
  useEffect(() => {
    document.forms.namedItem('authForm')?.reset(); // сброс формы
  }, [menu]);

  const formInputs: IForm = { login: '', password: '', passwordCheck: '' }; // Инициализация полей формы
  const [valueInputs, setValueInputs] = useState<IForm>(formInputs); // State формы

  // сработает по событию submit если форма заполнена без ошибок
  const onFinish = (values: IForm) => {
    setValueInputs(values);
    // setIsModalVisible(false);
    // document.forms.namedItem('authForm')?.reset(); // сброс формы
  };

  // const [fetchTable, isLoading] = useFetching(fetching); // Хук для обработки API запроса

  // // callback функция
  // async function fetching() {
  //   const data = await getTableLists<IDataTable>(valueInputs.tableId, listNameTable); // получаем данные
  //   addTableEvent(data); // добавить данные в store

  //   document.forms.namedItem('addDataTableForm')?.reset(); // сброс формы
  // }

  // // вызов функции для обработки API
  // useMemo(() => {
  //   if (valueInputs.tableId) {
  //     fetchTable();
  //   }
  // }, [valueInputs]);

  return (
    <div className={cl(className, styles['auth'])}>
      <Button onClick={() => setIsModalVisible(true)}>Войти</Button>
      {/* <Button>Выйти</Button> */}

      <Modal className={cl(styles['auth__modal'])} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <AuthMenu onClick={setMenu} />

        <Form
          name='authForm'
          className={cl(styles['auth__modal-form'])}
          action='/php/auth.php'
          method='post'
          autoComplete='off'
          onFinish={onFinish}
        >
          <AuthLogin className={cl(styles['auth__modal-input'])} />

          <AuthPassword className={cl(styles['auth__modal-input'])} registrationMod={menuItems.registration === menu} />

          {menuItems.registration === menu && (
            <AuthPassword className={cl(styles['auth__modal-input'])} registrationMod={true} name='authPasswordCheck' />
          )}

          <Button className={cl(styles['auth__modal-submit'])} type='primary' size='large' htmlType='submit'>
            {menuItems.registration === menu ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
