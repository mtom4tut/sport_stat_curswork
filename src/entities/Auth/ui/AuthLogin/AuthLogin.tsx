import { FC, useState } from 'react';

// API
import { mailVerificationCode, sendMailCodeVerification } from '~processes/auth/api';

// Styles
import cl from 'classnames';
import styles from './AuthLogin.module.scss';

// Components
import { Form, Input, InputNumber, Space } from 'antd';

interface AuthLoginProps {
  className?: string;
  registrationMod?: boolean;
}

export const AuthLogin: FC<AuthLoginProps> = ({ className, registrationMod }) => {
  const [login, setLogin] = useState<string>('');
  const [validCode, setValidCode] = useState<boolean>(false);
  const [sendCode, setSendCode] = useState<boolean>(false);

  async function sendMailCode(mail: string) {
    const data = await sendMailCodeVerification(mail);
    setSendCode(!data?.data.length && data?.status === 200);
    return data?.data;
  }

  async function verificationCode(mail: string, code: string) {
    const data = await mailVerificationCode(mail, code);

    return data?.data;
  }

  return (
    <>
      <Form.Item
        name='login'
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
              } else if (registrationMod && !sendCode) {
                const err = await sendMailCode(value);
                if (err) {
                  return Promise.reject(new Error(err));
                }
                setLogin(value);
              }
            },
          },
        ]}
      >
        <Space>
          <Input name='login' className={cl(styles['form-item__input'])} placeholder='Введите e-mail' allowClear />
        </Space>
      </Form.Item>

      {sendCode && (
        <Form.Item
          name='code'
          className={cl(className, styles['form-item'])}
          rules={[
            {
              validator: async (_, value) => {
                if (!value) {
                  return Promise.reject(new Error('Пожалуйста введите код подтверждения.'));
                } else if (value.length !== 6) {
                  return Promise.reject(new Error('Код должен содержать 6 символов'));
                } else if (!validCode) {
                  const err = await verificationCode(login, value);
                  if (err) {
                    return Promise.reject(new Error(err));
                  }
                  setValidCode(true);
                }
              },
            },
          ]}
        >
          <Space>
            <label htmlFor='code' className={cl(styles['form-item__label'])}>
              Вам на почту был отправлен код для подтверждения регистрации. Пожалуйста введите его:
            </label>
            <InputNumber
              id='code'
              name='code'
              type='number'
              controls={false}
              className={cl(styles['form-item__input'])}
              placeholder='Введите код подтверждения'
              maxLength={6}
            />
          </Space>
        </Form.Item>
      )}
    </>
  );
};
