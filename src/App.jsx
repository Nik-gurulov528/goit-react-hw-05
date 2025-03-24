import { Route, Routes } from 'react-router';
import './App.css';
import { lazy, Suspense } from 'react';
const Navigation = lazy(() => import('./components/Navigation/Navigation'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));

function App() {
  return (
    <>
      <Suspense fallback={<p className="loadingText">Loading...</p>}>
        <Navigation />
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
}

export default App;
