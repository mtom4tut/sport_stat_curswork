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
      className={cl(className, styles['form-item'])}
      rules={[
        {
          validator: async (_, value) => {
            if (!value) {
              return Promise.reject(new Error('Пожалуйста введите e-mail.'));
            } else if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)) {
              return Promise.reject(new Error('Введите корректный e-mail'));
            }
          },
        },
      ]}
    >
      <Space className={cl(styles['form__item-space'])}>
        <Input name='authLogin' className={cl(styles['form-item__input'])} placeholder='Введите e-mail' />
      </Space>
    </Form.Item>
  );
};
