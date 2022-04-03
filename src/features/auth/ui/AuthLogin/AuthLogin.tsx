import { FC, useState } from 'react';

// API
import { sendMailCodeVerification } from '~processes/auth/api';

// Styles
import cl from 'classnames';
import styles from './AuthLogin.module.scss';

// Components
import { Form, Input, Space } from 'antd';

interface AuthLoginProps {
  className?: string;
  registrationMod?: boolean;
}

export const AuthLogin: FC<AuthLoginProps> = ({ className, registrationMod }) => {
  const [sendCode, setSendCode] = useState<boolean>(false);
  async function sendMailCode(mail: string) {
    const data = await sendMailCodeVerification(mail);
    setSendCode(!!data && data.status === 200);
  }

  return (
    <>
      <Form.Item
        name='authLogin'
        className={cl(className, styles['form-item'])}
        rules={[
          {
            validator: async (_, value) => {
              if (!value) {
                setSendCode(false);
                return Promise.reject(new Error('Пожалуйста введите e-mail.'));
              } else if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)) {
                setSendCode(false);
                return Promise.reject(new Error('Введите корректный e-mail'));
              } else if (registrationMod) {
                sendMailCode(value);
              }
            },
          },
        ]}
      >
        <Space>
          <Input name='authLogin' className={cl(styles['form-item__input'])} placeholder='Введите e-mail' />
        </Space>
      </Form.Item>

      {sendCode && (
        <Form.Item
          name='authCode'
          className={cl(className, styles['form-item'])}
          rules={[
            {
              validator: async (_, value) => {
                if (!value) {
                  return Promise.reject(new Error('Пожалуйста введите код подтверждения.'));
                } else if (value.length === 6) {
                  return Promise.reject(new Error('Код должен содержать 6 символов'));
                }
              },
            },
          ]}
        >
          <Space>
            <label htmlFor='authCode' className={cl(styles['form-item__label'])}>
              Вам на почту был отправлен код для подтверждения регистрации. Пожалуйста введите его:
            </label>
            <Input
              id='authCode'
              name='authCode'
              className={cl(styles['form-item__input'])}
              placeholder='Введите код подтверждения'
            />
          </Space>
        </Form.Item>
      )}
    </>
  );
};
