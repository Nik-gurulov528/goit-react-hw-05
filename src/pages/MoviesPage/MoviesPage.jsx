import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import css from './MoviesPage.module.css';
import { useId, useState, lazy, Suspense, useEffect } from 'react';
// import fetchFormData from '../../js/fetchFormData';
import fetchData from '../../js/fetchData';
import { useSearchParams } from 'react-router';
const MovieList = lazy(() => import('../../components/MovieList/MovieList'));

export default function MoviesPage() {
  const inputId = useId();
  const [movies, setMovies] = useState(() => {
    const getData = sessionStorage.getItem('formInfo');

    if (getData !== null) {
      const jsonGetData = JSON.parse(getData);
      return jsonGetData.listOfFilms;
    }

    return {};
  });
  const [isError, setIsError] = useState(() => {
    const getData = sessionStorage.getItem('formInfo');

    if (getData !== null) {
      const jsonGetData = JSON.parse(getData);
      return jsonGetData.error;
    }

    return false;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryWord, setQueryWord] = useState(() => {
    const getData = sessionStorage.getItem('formInfo');

    if (getData !== null) {
      const jsonGetData = JSON.parse(getData);
      return jsonGetData.word;
    }

    return '';
  });

  function handleSubmit(values, actions) {
    const update = new URLSearchParams(searchParams);
    update.set('query', values.searchStr);
    setQueryWord(values.searchStr);
    setSearchParams(update);
    actions.resetForm();
  }

  useEffect(() => {
    try {
      setIsLoading(true);
      setIsError(false);
      fetchData('form', queryWord).then(data => setMovies(data.results));
    } catch {
      setIsError(true);
      setMovies({});
    } finally {
      setIsLoading(false);
    }
  }, [queryWord]);
  useEffect(() => {
    if (isError) {
      const update = new URLSearchParams(searchParams);
      update.delete('query');
      setQueryWord('');
      setSearchParams(update);
    }
  }, [isError]);
  useEffect(() => {
    const startURL = new URLSearchParams(searchParams);
    if (movies.length !== 0 && !isError) {
      startURL.set('query', queryWord);
    } else {
      startURL.delete('query');
    }
    setSearchParams(startURL);
  }, []);
  useEffect(() => {
    const allData = { listOfFilms: movies, error: isError, word: queryWord };
    const jsonData = JSON.stringify(allData);
    sessionStorage.setItem('formInfo', jsonData);
  }, [movies, isError, queryWord]);

  const formikOptions = Yup.object().shape({
    searchStr: Yup.string().trim().min(1).required(),
  });

  return (
    <>
      <Formik
        initialValues={{ searchStr: '' }}
        onSubmit={handleSubmit}
        validationSchema={formikOptions}
      >
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
      {isLoading && <p className={css.loadingText}>Loading...</p>}
      {isError ? (
        <p>Oops, sorry, something went wrong!</p>
      ) : (
        <Suspense fallback={<p className={css.loadingText}>Loading...</p>}>
          {movies.length !== 0 && (
            <MovieList info={movies} tag="Movies with similar title" />
          )}
        </Suspense>
      )}
    </>
  );
}
