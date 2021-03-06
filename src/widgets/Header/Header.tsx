import { FC } from 'react';
import { Link } from 'react-router-dom';

// Config
import { NAVIGATION_ITEMS } from '~shared/ui/Navigation/model';

// Components
import { Container } from '~shared/layout/Container';
import Navigation from '~shared/ui/Navigation/Navigation';
import { Auth } from '~entities/Auth';

// Styles
import cl from 'classnames';
import styles from './Header.module.scss';

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

        <Auth className={cl(styles['header__auth'])} />
      </Container>
    </header>
  );
};
