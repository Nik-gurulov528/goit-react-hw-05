import clsx from 'clsx';
import css from './Navigation.module.css';
import { NavLink } from 'react-router';

export default function Navigation() {
  const stylesLink = ({ isActive }) =>
    clsx(css.headerLink, isActive && css.activeLink);

  return (
    <header className={css.topHeader}>
      <nav>
        <NavLink to="/" className={stylesLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={stylesLink}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
