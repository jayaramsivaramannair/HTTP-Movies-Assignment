import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const routeToUpdateForm = (e) => {
    history.push(`/update-movie/${params.id}`)
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = (e) => {
    e.preventDefault();
    let newList = '';
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log(res.data);
        newList = movieList.filter((movie) => movie.id !== res.data);
        setMovieList(newList);
      })
      .catch(err => console.log(err))
    history.push('/');
  }

  return (
    <div className="save-wrapper">
      <button style={{ backgroundColor: 'red' }} onClick={deleteMovie}>Delete Movie</button>
      <button style={{ backgroundColor: 'yellowgreen' }} onClick={routeToUpdateForm}>Update Movie</button>
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
