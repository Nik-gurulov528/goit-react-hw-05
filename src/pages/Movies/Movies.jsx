import { Formik, Form, Field } from 'formik';
import css from './Movies.module.css';
import { useId, useState, lazy, Suspense } from 'react';
// import fetchFormData from '../../js/fetchFormData';
import fetchData from '../../js/fetchData';
const CurrentTrends = lazy(() =>
  import('./../../components/CurrentTrends/CurrentTrends')
);

export default function Movies() {
  const inputId = useId();
  const [movies, setMovies] = useState({});

  function handleSubmit(values) {
    fetchData('form', values.searchStr).then(data => setMovies(data.results));
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
      <Suspense fallback={<p className={css.loadingText}>Loading...</p>}>
        {movies.length && (
          <CurrentTrends info={movies} tag="Movies with similar title" />
        )}
      </Suspense>
    </>
  );
}
