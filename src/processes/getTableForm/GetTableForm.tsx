import { FC } from 'react';

// Components
import Title from 'antd/lib/typography/Title';
import { Button, Input, Form, Space } from 'antd';

// Styles
import cl from 'classnames';
import styles from './GetTableForm.module.scss';

interface GetTableForm {
  className?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5;
}

const GetTableForm: FC<GetTableForm> = ({ className, titleLevel = 1 }) => {
  return (
    <Form name='getDataTableForm' className={cl(className, styles['form'])}>
      <Title level={titleLevel}>Получить данные таблицы</Title>

      <Form.Item
        name='tableId'
        rules={[{ required: true, message: 'Пожалуйста заполните это поле!' }]}
        className={cl(styles['form__item'])}
      >
        <Space className={cl(styles['form__item-space'])}>
          <Input placeholder='Введите id таблицы' size='large' />
        </Space>
      </Form.Item>

      <Button className={cl(styles['form__submit'])} type='primary' size='large' htmlType='submit'>
        Получить
      </Button>
    </Form>
  );
};

export default GetTableForm;
