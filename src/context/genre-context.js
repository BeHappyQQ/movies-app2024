import React, { createContext, Component } from 'react';

import MovieService from '../services/movie-service';

const GenreContext = createContext();

export class GenreProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
    };

    this.movieService = new MovieService();
  }

  async componentDidMount() {
    const data = await this.movieService.fetchGenres();
    this.setState({ genres: data });
  }

  render() {
    return <GenreContext.Provider value={this.state.genres}>{this.props.children}</GenreContext.Provider>;
  }
}

export default GenreContext;
