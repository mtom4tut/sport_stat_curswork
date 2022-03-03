import { FC } from 'react';

// Config
import { NAVIGATION_ITEMS } from '~shared/ui/Navigation/model';

// Components
import { Container } from '~shared/layout/Container';
import Navigation from '~shared/ui/Navigation/Navigation';

// Styles
import cl from 'classnames';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {

  return (
    <header className={cl(className, styles['header'])}>
      <Container className={cl(styles['header__content'])}>
        <Link to='/' className={cl(styles['header__content-logo'])}>
          <img src={require('~assets/img/logo.png')} alt='logo' />
        </Link>
        <Navigation navigationItems={NAVIGATION_ITEMS} />
      </Container>
    </header>
  );
};
