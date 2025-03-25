import { Outlet, useLocation, useParams } from 'react-router';
// import fetchExactData from '../../js/fetchExactData';
import fetchData from '../../js/fetchData';
import css from './MovieDetailsPage.module.css';
import { Suspense, useState, lazy, useEffect, useRef } from 'react';
const Details = lazy(() => import('../../components/Details/Details'));
import { NavLink } from 'react-router';
const BackBtn = lazy(() => import('./../../components/BackBtn/BackBtn'));

export default function MovieDetailsPage() {
  const location = useLocation();
  const prevLocation = useRef(location.state);

  const [filmData, setFilmData] = useState(() => {
    const exactGetData = sessionStorage.getItem('detailsAboutFilm');

    if (exactGetData !== null) {
      const jsonExactData = JSON.parse(exactGetData);
      return jsonExactData;
    }

    return {};
  });
  const [isError, setisError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    try {
      setisError(false);
      fetchData('exact', movieId).then(data => setFilmData(data));
    } catch {
      setisError(true);
    }
  }, [movieId]);

  useEffect(() => {
    const saveExavtData = JSON.stringify(filmData);
    sessionStorage.setItem('detailsAboutFilm', saveExavtData);
  }, [filmData]);

  if (!isError) {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <div className={css.detailWrapper}>
          <BackBtn address={prevLocation.current} />
          <Details filmData={filmData} />
          <Outlet />
        </div>
      </Suspense>
    );
  } else {
    <p>Oops, sorry, something went wrong!</p>;
  }
}
