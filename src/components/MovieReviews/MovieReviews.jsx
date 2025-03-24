// import fetchReviews from './../../js/fetchReviews';
import fetchData from '../../js/fetchData';
import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router';
const MoreDetails = lazy(() =>
  import('./../../components/MoreDetails/MoreDetails')
);

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState({});
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    try {
      setIsError(false);
      fetchData('reviews', movieId).then(data => setReviews(data));
    } catch {
      setIsError(true);
    }
  }, [movieId]);

  if (!isError) {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <MoreDetails result={reviews} additionalInfo="reviews" />
      </Suspense>
    );
  } else {
    <p>Oops, sorry, something went wrong!</p>;
  }
}
