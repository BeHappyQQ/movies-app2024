import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Rate } from 'antd';

import PosterLoader from './poster-loader';

function fixOverview(overview) {
  if (!overview) return '';
  const maxLength = 210;
  if (overview.length <= maxLength) {
    return overview;
  } else {
    const lastSpaceIndex = overview.lastIndexOf(' ', maxLength);
    if (lastSpaceIndex !== -1) {
      return overview.substring(0, lastSpaceIndex) + '...';
    } else {
      return overview.substring(0, maxLength) + '...';
    }
  }
}

function formatDate(release_date) {
  if (release_date) {
    return format(parseISO(release_date), 'MMMM d, yyyy', { locale: enUS });
  } else {
    return 'N/A';
  }
}

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
    };
  }

  handleImageLoaded = () => {
    this.setState({ imageLoaded: true });
  };

  handleRateChange = (value) => {
    const { id } = this.props;
    this.props.onMovieRate(id, value);
  };

  render() {
    const { title, release_date, overview, poster_path, vote_average, moviesRatings, id, genre_ids, genreData } =
      this.props;
    const { imageLoaded } = this.state;

    const fixedOverview = fixOverview(overview);
    const formattedReleaseDate = formatDate(release_date);

    const getBorderColor = () => {
      if (vote_average < 3) {
        return '#E90000';
      }
      if (vote_average >= 3 && vote_average < 5) {
        return '#E97E00';
      }
      if (vote_average >= 5 && vote_average < 7) {
        return '#E9D100';
      }
      return '#66E900';
    };

    const getRating = () => {
      return moviesRatings[id] || 0;
    };

    const getGenresByIds = (genreIds) => {
      const selectedGenres = genreData.genres.filter((genre) => genreIds.includes(genre.id));
      return selectedGenres.map((genre) => <div key={genre.id}>{genre.name}</div>);
    };

    return (
      <li className="movie">
        <div className="movie-poster">
          {!imageLoaded && <PosterLoader />}
          <img
            alt={title}
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            onLoad={this.handleImageLoaded}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        </div>
        <div className="movie-details">
          <h2 className="movie-title">{title}</h2>
          <div className="movie-rating" style={{ borderColor: getBorderColor() }}>
            {vote_average ? vote_average.toFixed(1) : 'N/A'}
          </div>
          <p className="movie-release-date">{formattedReleaseDate}</p>
          <div className="movie-genre">{getGenresByIds(genre_ids)}</div>
          <p className="movie-description">{fixedOverview}</p>
          <Rate
            className="movie-rate"
            allowHalf
            defaultValue={getRating()}
            count={10}
            onChange={this.handleRateChange}
          />
        </div>
      </li>
    );
  }
  propTypes = {
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    moviesRatings: PropTypes.object,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    genreData: PropTypes.shape({
      genres: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    onMovieRate: PropTypes.func.isRequired,
  };

  defaultProps = {
    title: 'N/A',
    release_date: null,
    overview: '',
    poster_path: '',
    vote_average: 0,
    moviesRatings: {},
    id: '',
    genre_ids: [],
    genreData: { genres: [] },
  };
}
