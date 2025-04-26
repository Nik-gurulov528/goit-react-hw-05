import css from './Details.module.css';
import { NavLink } from 'react-router';

export default function Details({ filmData }) {
  try {
    return (
      <div key={filmData.id} className={css.allInfoFilm}>
        <img
          src={`https://image.tmdb.org/t/p/w300/${filmData.poster_path}`}
          alt=""
        />
        <div className={css.textInfoFilm}>
          <h1>{filmData.title}</h1>
          <h2>Overview</h2>
          <p>{filmData.overview}</p>
          <h2>Genres</h2>
          <ul>
            {filmData.genres.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
          <h2>Release Date</h2>
          <p>{filmData.release_date}</p>
          <ul className={css.additionalInfo}>
            <li>
              <NavLink to="reviews" className={css.additionalBtn}>
                Reviews
              </NavLink>
            </li>
            <li>
              <NavLink to="cast" className={css.additionalBtn}>
                Cast
              </NavLink>
            </li>
          </ul>
        </div>
        {/* <button type="button" onClick={() => console.log(filmData)}>
        Click
      </button> */}
      </div>
    );
  } catch {
    <p className={css.errorText}>Oops, sorry, something went wrong!</p>;
  }
}
