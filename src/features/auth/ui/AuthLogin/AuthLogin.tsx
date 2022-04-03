import { FC } from 'react';

// Styles
import cl from 'classnames';
import styles from './AuthLogin.module.scss';
import { Form, Input, Space } from 'antd';

// Components

interface AuthLoginProps {
  className?: string;
}

export const AuthLogin: FC<AuthLoginProps> = ({ className }) => {
  return (
    <Form.Item
      name='authLogin'
      className={cl(className, styles['form__item'])}
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
        <Input name='authLogin' className={cl(styles['auth__input'])} placeholder='Введите логин' />
      </Space>
    </Form.Item>
  );
};
