import React, { useContext } from 'react';

import Movie from '../movie/movie';
import GenreContext from '../../context/genre-context';

const MovieList = ({ movies, onMovieRate, moviesRatings }) => {
  const genreData = useContext(GenreContext);

  const elements = movies.map((movie) => {
    const { id, ...movieProps } = movie;
    return (
      <Movie
        key={id}
        id={id}
        onMovieRate={onMovieRate}
        moviesRatings={moviesRatings}
        genreData={genreData}
        {...movieProps}
      />
    );
  });

  return <ul className="movie-list">{elements}</ul>;
};

export default MovieList;
