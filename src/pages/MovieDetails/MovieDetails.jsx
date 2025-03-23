import { Outlet, useLocation, useParams } from 'react-router';
// import fetchExactData from '../../js/fetchExactData';
import fetchData from '../../js/fetchData';
import css from './MovieDetails.module.css';
import { Suspense, useState, lazy, useEffect } from 'react';
const Details = lazy(() => import('./../../components/Details/Details'));
import { NavLink } from 'react-router';
import BackBtn from '../../components/BackBtn/BackBtn';

export default function MovieDetails() {
  const location = useLocation();

  const [filmData, setFilmData] = useState(() => {
    const exactGetData = sessionStorage.getItem('detailsAboutFilm');

    if (exactGetData !== null) {
      const jsonExactData = JSON.parse(exactGetData);
      return jsonExactData;
    }

    return {};
  });

  const { movieId } = useParams();
  fetchData('exact', movieId).then(data => setFilmData(data));

  useEffect(() => {
    const saveExavtData = JSON.stringify(filmData);
    sessionStorage.setItem('detailsAboutFilm', saveExavtData);
  }, [filmData]);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className={css.detailWrapper}>
        <BackBtn address={location.state} />
        <Details filmData={filmData} />
        <Outlet />
      </div>
    </Suspense>
  );
}
