import axios from 'axios';

export default async function fetchFormData(value) {
  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWFmNTEzNmEwZmMxZjUyNGRiNWM4ZGQyYzdiYzM2ZiIsIm5iZiI6MTc0MjUzOTk2OS4zMDQ5OTk4LCJzdWIiOiI2N2RkMGNjMTMzOGU3Nzc4M2ZmNTQwZmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fu8nWBl8i28FCndmL5mBX-8A0Z0cZVUOQIitBY46Agc',
      },
    };

    try {
      const responce = await axios.get(url, options);
      return responce.data;
    } catch (error) {
      console.log(error);
    }
  };

  let lookingFor = fetchData();
  return lookingFor;
}
