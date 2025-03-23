import { useState, useEffect, lazy, Suspense } from 'react';
// import fetchTrendingData from '../../js/fetchTrendingData';
import fetchData from '../../js/fetchData';
import css from './Home.module.css';
const CurrentTrends = lazy(() =>
  import('./../../components/CurrentTrends/CurrentTrends')
);

export default function Home() {
  const [trend, setTrend] = useState(() => {
    const attempt = sessionStorage.getItem('homePageFilms');
    if (attempt !== null) {
      const parseData = JSON.parse(attempt);
      return parseData;
    }

    return {};
  });

  useEffect(() => {
    fetchData('home').then(data => setTrend(data.results));
  }, []);
  useEffect(() => {
    const jsonData = JSON.stringify(trend);
    sessionStorage.setItem('homePageFilms', jsonData);
  }, [trend]);

  try {
    return (
      <Suspense fallback={<p className={css.loadingText}>Loading...</p>}>
        <div className={css.homePage}>
          <CurrentTrends info={trend} tag="Trending Today" />
        </div>
      </Suspense>
    );
  } catch {
    return (
      <p className={css.errorMessage}>Oops, sorry, something went wrong!</p>
    );
  }
}
