import css from './CurrentTrends.module.css';
import { NavLink, useLocation } from 'react-router';

export default function CurrentTrends({ info, tag }) {
  const location = useLocation();
  try {
    return (
      <div className={css.homePage}>
        <h1 className={css.trendingToday}>{tag}</h1>
        <ul className={css.todayFilms}>
          {info.map(item => {
            const imageAddress = `https://image.tmdb.org/t/p/w200/${item.poster_path}`;
            return (
              <li key={item.id} className={css.itemToday}>
                <NavLink to={`/movies/${item.id}`} state={location}>
                  <img src={imageAddress} alt={item.original_title} />
                  <p className={css.titleFilm}>{item.title}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } catch {
    return (
      <p className={css.errorMessage}>Oops, sorry, something went wrong!</p>
    );
  }
}
