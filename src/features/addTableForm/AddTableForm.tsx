import { FC, useMemo, useState } from 'react';

// Config
import { IForm } from './model/types';

// Components
import Title from 'antd/lib/typography/Title';
import { Button, Input, Form, Space, notification } from 'antd';

// Hooks

// Styles
import cl from 'classnames';
import styles from './AddTableForm.module.scss';
import { getTableList } from '~processes/getTable/api';
import { useFetching } from '~shared/hooks/useFetching';

interface AddTableFormProps {
  className?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5;
}

export const AddTableForm: FC<AddTableFormProps> = ({ className, titleLevel = 1 }) => {
  const [valueInputs, setValueInputs] = useState<IForm>({ tableId: '' });

  // сработает по событию submit если форма заполнена без ошибок
  function onFinish(values: IForm) {
    setValueInputs({ ...valueInputs, tableId: values.tableId });
  }

  // Хук для обработки API запроса
  const [fetchTabel, isLoading, errorTabel] = useFetching(fetching);

  // callback функция
  async function fetching() {
    const dataLegs = await getTableList(valueInputs.tableId, 'Ноги');
  }

  // вызов функции для обработки API
  useMemo(() => {
    if (valueInputs.tableId) {
      fetchTabel();
    }
  }, [valueInputs]);

  // Окно с собщение об ошибке
  useMemo(() => {
    if (errorTabel) {
      notification['error']({
        message: `Ошибка`,
        description: errorTabel,
      });
    }
  }, [errorTabel]);

  return (
    <Form name='addDataTableForm' className={cl(className, styles['form'])} onFinish={onFinish} autoComplete='off'>
      <Title level={titleLevel} className={cl(styles['form__title'])}>
        Получить данные из Google таблицы
      </Title>

      <Form.Item
        name='tableId'
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
        className={cl(styles['form__item'])}
      >
        <Space className={cl(styles['form__item-space'])}>
          <Input placeholder='Введите id таблицы' size='large' />
        </Space>
      </Form.Item>

      <Button className={cl(styles['form__submit'])} type='primary' size='large' htmlType='submit' loading={isLoading}>
        Получить
      </Button>
    </Form>
  );
};
