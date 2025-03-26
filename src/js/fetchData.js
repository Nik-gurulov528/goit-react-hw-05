import axios from 'axios';

export default async function fetchData(fetch, value) {
  const fetchData = async () => {
    let url = null;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWFmNTEzNmEwZmMxZjUyNGRiNWM4ZGQyYzdiYzM2ZiIsIm5iZiI6MTc0MjUzOTk2OS4zMDQ5OTk4LCJzdWIiOiI2N2RkMGNjMTMzOGU3Nzc4M2ZmNTQwZmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fu8nWBl8i28FCndmL5mBX-8A0Z0cZVUOQIitBY46Agc',
      },
    };

    switch (fetch) {
      case 'home':
        url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
        break;
      case 'form':
        url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;
        break;
      case 'exact':
        url = `https://api.themoviedb.org/3/movie/${value}?language=en-US`;
        break;
      case 'reviews':
        url = `https://api.themoviedb.org/3/movie/${value}/reviews?language=en-US&page=1`;
        break;
      case 'cast':
        url = `https://api.themoviedb.org/3/movie/${value}/credits?language=en-US`;
        break;
      default:
        url = null;
    }

    try {
      const responce = await axios.get(url, options);
      return responce.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  let data = fetchData();
  return data;
}
