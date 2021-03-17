import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies, getMovieList }) {
  //Fetches the movies when this component loads
  useEffect(() => {
    getMovieList();
  }, [getMovieList])

  return (
    <div className="movie-list">
      <Link to="/add-movie" style={{ textDecoration: 'none' }}>
        Add A New Movie
      </Link>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
