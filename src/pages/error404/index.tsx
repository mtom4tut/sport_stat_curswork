import { FC } from 'react';
import { useNavigate } from 'react-router';

// Components
import { Button, Result } from 'antd';
import { Container } from '~shared/layout/Container';

// styles
import cl from 'classnames';
import styles from './Error404.module.scss';

const Error404: FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Result
        className={cl(styles['error'])}
        status='404'
        title='404'
        subTitle='Извините, страница, которую вы посетили, не существует.'
        extra={
          <Button type='primary' onClick={() => navigate('/')}>
            Вернуться на главную
          </Button>
        }
      />
    </Container>
  );
};

export default Error404;
