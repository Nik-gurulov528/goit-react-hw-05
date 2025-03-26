import css from './BackBtn.module.css';
import { NavLink } from 'react-router';
import { useEffect, useState } from 'react';

export default function BackBtn({ address }) {
  const [way, setWay] = useState('/');
  useEffect(() => {
    if (address !== null) {
      setWay(address);
    }
  }, []);
  return (
    <NavLink to={way} className={css.goBackBtn}>
      Go Back
    </NavLink>
  );
}
