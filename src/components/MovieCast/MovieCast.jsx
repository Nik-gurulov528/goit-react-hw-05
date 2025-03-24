import fetchData from '../../js/fetchData';
import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router';
const MoreDetails = lazy(() =>
  import('./../../components/MoreDetails/MoreDetails')
);

export default function MovieReviews() {
  const { movieId } = useParams();
  const [credits, setCredits] = useState({});
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    try {
      setIsError(false);
      fetchData('cast', movieId).then(data => setCredits(data));
    } catch {
      setIsError(true);
    }
  }, [movieId]);

  if (!isError) {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <MoreDetails result={credits} additionalInfo="cast" />
      </Suspense>
    );
  } else {
    <p>Oops, sorry, something went wrong!</p>;
  }
}
