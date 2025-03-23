import fetchData from '../../js/fetchData';
import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router';
const MoreDetails = lazy(() =>
  import('./../../components/MoreDetails/MoreDetails')
);

export default function MovieReviews() {
  const { movieId } = useParams();
  const [credits, setCredits] = useState({});
  useEffect(() => {
    fetchData('cast', movieId).then(data => setCredits(data));
  }, [movieId]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MoreDetails result={credits} additionalInfo="cast" />
    </Suspense>
  );
}
