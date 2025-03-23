import css from './Header.module.css';
import { NavLink } from 'react-router';

export default function Header() {
  return (
    <header className={css.topHeader}>
      <nav>
        <NavLink to="/" className={css.headerLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={css.headerLink}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
