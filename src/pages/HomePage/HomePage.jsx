import { useState, useEffect, lazy, Suspense } from 'react';
// import fetchTrendingData from '../../js/fetchTrendingData';
import fetchData from '../../js/fetchData';
import css from './HomePage.module.css';
const MovieList = lazy(() => import('../../components/MovieList/MovieList'));

export default function HomePage() {
  const [trend, setTrend] = useState(() => {
    const attempt = sessionStorage.getItem('homePageFilms');
    if (attempt !== null) {
      const parseData = JSON.parse(attempt);
      return parseData;
    }

    return {};
  });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      setIsError(false);
      fetchData('home').then(data => setTrend(data.results));
    } catch {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    const jsonData = JSON.stringify(trend);
    sessionStorage.setItem('homePageFilms', jsonData);
  }, [trend]);

  if (!isError) {
    try {
      return (
        <Suspense fallback={<p className={css.loadingText}>Loading...</p>}>
          <div className={css.homePage}>
            <MovieList info={trend} tag="Trending Today" />
          </div>
        </Suspense>
      );
    } catch {
      return (
        <p className={css.errorMessage}>Oops, sorry, something went wrong!</p>
      );
    }
  } else {
    return (
      <p className={css.errorMessage}>Oops, sorry, something went wrong!</p>
    );
  }
}
