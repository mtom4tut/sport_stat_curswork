import { FC } from 'react';
import { NavLink } from 'react-router-dom';

// Config
import { INavItem } from '~shared/ui/Navigation/model/types';

// Styles
import cl from 'classnames';
import styles from './Navigation.module.scss';

interface NavigationProps {
  className?: string;
  navigationItems: INavItem[];
}

const Navigation: FC<NavigationProps> = ({ navigationItems, className }) => {
  return (
    <nav className={cl(className, styles['nav'])}>
      <ul>
        {navigationItems.map(navItem => (
          <li key={navItem.path}>
            <NavLink
              className={nav => (nav.isActive ? cl(styles['nav__item'], styles['active']) : cl(styles['nav__item']))}
              to={navItem.path}
            >
              {navItem.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
