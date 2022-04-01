import { FC, useMemo, useState } from 'react';

// API
import { getTableLists } from '~processes/getTable/api';

// Events
import { addTableEvent } from '~processes/getTable/model/event';

// Config
import { AddTableFormProps, IDataTable, IForm } from './model/types';
import { listNameTable } from '~processes/getTable/model/listNameTable';

// Components
import Title from 'antd/lib/typography/Title';
import { Button, Input, Form, Space } from 'antd';

// Hooks
import { useFetching } from '~shared/hooks/useFetching';

// Styles
import cl from 'classnames';
import styles from './AddTableForm.module.scss';

export const AddTableForm: FC<AddTableFormProps> = ({ className, titleLevel = 1 }) => {
  const formInputs = { tableId: '' }; // Инициализация полей формы

  const [valueInputs, setValueInputs] = useState<IForm>(formInputs); // State формы

  // сработает по событию submit если форма заполнена без ошибок
  function onFinish(values: IForm) {
    setValueInputs({ ...valueInputs, tableId: values.tableId });
  }

  const [fetchTable, isLoading] = useFetching(fetching); // Хук для обработки API запроса

  // callback функция
  async function fetching() {
    const data = await getTableLists<IDataTable>(valueInputs.tableId, listNameTable); // получаем данные
    addTableEvent(data); // добавить данные в store

    document.forms.namedItem('addDataTableForm')?.reset(); // сброс формы
  }

  // вызов функции для обработки API
  useMemo(() => {
    if (valueInputs.tableId) {
      fetchTable();
    }
  }, [valueInputs]);

  return (
    <Form name='addDataTableForm' className={cl(className, styles['form'])} onFinish={onFinish} autoComplete='off'>
      <Title level={titleLevel} className={cl(styles['form__title'])}>
        Получить данные из Google таблицы
      </Title>

      <Form.Item
        name='tableId'
        className={cl(styles['form__item'])}
        rules={[
          {
            validator: async (_, value) => {
              if (!value || value.length !== 44) {
                return Promise.reject(
                  new Error('ID таблицы не соответствует стандарту. ID должен содержать 44 символа.')
                );
              }
            },
          },
        ]}
      >
        <Space className={cl(styles['form__item-space'])}>
          <Input name='spreadsheetId' placeholder='Введите id таблицы' size='large' />
        </Space>
      </Form.Item>

      <Button className={cl(styles['form__submit'])} type='primary' size='large' htmlType='submit' loading={isLoading}>
        Получить
      </Button>
    </Form>
  );
};
