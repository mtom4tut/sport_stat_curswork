import { FC } from 'react';
import { Link } from 'react-router-dom';

// Config
import { navigationItems } from '~shared/ui/Navigation/model';

// Components
import { Container } from '~shared/layout/Container';
import Navigation from '~shared/ui/Navigation/Navigation';

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
        <Link to='/'>
          <img className={cl(styles['header__content-logo'])} src={require('~assets/img/logo.png')} alt='logo' />
        </Link>

        <Navigation navigationItems={navigationItems} />
      </Container>
    </header>
  );
};
