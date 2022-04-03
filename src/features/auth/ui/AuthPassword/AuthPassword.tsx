import { FC } from 'react';

// Styles
import cl from 'classnames';
import styles from './AuthPassword.module.scss';

import { Form, Input, Space } from 'antd';

// Components

interface AuthPasswordProps {
  className?: string;
  registrationMod?: boolean;
  name?: string;
}

export const AuthPassword: FC<AuthPasswordProps> = ({ className, registrationMod, name = 'authPassword' }) => {
  return (
    <Form.Item
      name={name}
      className={cl(className, styles['form-item'])}
      rules={[
        {
          validator: async (_, value) => {
            if (!value) {
              return Promise.reject(new Error('Введите пароль'));
            } else if (registrationMod && value.length <= 6) {
              return Promise.reject(new Error('Длина пароля должна быль больше 6 символов'));
            } else if (
              registrationMod &&
              document.forms.namedItem('authForm')?.querySelector<HTMLInputElement>('[name="authPassword"]')?.value !==
                value
            ) {
              return Promise.reject(new Error('Пароли не совпадают'));
            }
          },
        },
      ]}
    >
      <Space>
        <Input.Password name={name} className={cl(styles['form-item__input'])} placeholder='Введите пароль' autoComplete="on" />
      </Space>
    </Form.Item>
  );
};
