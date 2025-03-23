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
  useEffect(() => {
    fetchData('reviews', movieId).then(data => setReviews(data));
  }, [movieId]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MoreDetails result={reviews} additionalInfo="reviews" />
    </Suspense>
  );
}
