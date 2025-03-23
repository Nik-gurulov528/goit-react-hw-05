import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import NotFound from './pages/NotFound/NotFound';
import MovieReviews from './components/MovieReviews/MovieReviews';
import MovieCast from './components/MovieCast/MovieCast';

function App() {
  return (
    <>
      <Header />
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
