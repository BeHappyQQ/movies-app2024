import React from "react";
import Movie from "../movie/movie";

const MovieList = ({ movies }) => {

    const elements = movies.map((movie) => {
        const { id, ...movieProps } = movie;
        return (
            <Movie key={id}
                    {...movieProps}
            />
        )
    })


    return <ul className="movie-list">{ elements }</ul>
}

export default MovieList;