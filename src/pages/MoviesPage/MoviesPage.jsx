import { Formik, Form, Field } from 'formik';
import css from './MoviesPage.module.css';
import { useId, useState, lazy, Suspense } from 'react';
// import fetchFormData from '../../js/fetchFormData';
import fetchData from '../../js/fetchData';
const MovieList = lazy(() => import('../../components/MovieList/MovieList'));

export default function MoviesPage() {
  const inputId = useId();
  const [movies, setMovies] = useState({});
  const [isError, setIsError] = useState(false);

  function handleSubmit(values) {
    try {
      setIsError(false);
      fetchData('form', values.searchStr).then(data => setMovies(data.results));
    } catch {
      setIsError(true);
    }
  }

  return (
    <>
      <Formik initialValues={{ searchStr: '' }} onSubmit={handleSubmit}>
        <Form className={css.searchForm}>
          <div className={css.formInput}>
            <label htmlFor={`${inputId}-input`} className={css.nameOfField}>
              Please, enter name of film
            </label>
            <Field
              name="searchStr"
              id={`${inputId}-input`}
              className={css.searchField}
            />
          </div>
          <button type="submit" className={css.submitBtn}>
            Search
          </button>
        </Form>
      </Formik>
      {!isError ? (
        <Suspense fallback={<p className={css.loadingText}>Loading...</p>}>
          {movies.length && (
            <MovieList info={movies} tag="Movies with similar title" />
          )}
        </Suspense>
      ) : (
        <p>Oops, sorry, something went wrong!</p>
      )}
    </>
  );
}
