import css from './MoreDetails.module.css';

export default function MoreDetails({ result, additionalInfo }) {
  if (additionalInfo === 'reviews') {
    if (result.results && result.results.length !== 0) {
      return (
        <>
          <h3 className={css.moreInfoTitle}>Reviews</h3>

          <ul className={css.reviewList}>
            {result.results.map(item => (
              <li key={item.id} className={css.reviewItem}>
                <h4 className={css.reviewItemInfo}>{item.author}</h4>
                <p className={css.reviewItemInfo}>{item.created_at}</p>
                <p className={css.reviewItemInfo}>{item.content}</p>
              </li>
            ))}
          </ul>
        </>
      );
    } else {
      return (
        <>
          <h3>Reviews</h3>
          <p>This film hasn't reviews!</p>
        </>
      );
    }
  } else if (additionalInfo === 'cast') {
    if (result.cast && result.cast.length !== 0) {
      return (
        <>
          <h3 className={css.moreInfoTitle}>Cast</h3>
          <ul className={css.castCollection}>
            {result.cast.map(item => (
              <li key={item.id} className={css.castItem}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${item.profile_path}`}
                  alt={item.name}
                />
                <h4>{item.name}</h4>
                <p>{item.character}</p>
              </li>
            ))}
          </ul>
        </>
      );
    } else {
      return (
        <>
          <h3>Cast</h3>
          <p>Sorry, something went wrong!</p>
        </>
      );
    }
  }
}
