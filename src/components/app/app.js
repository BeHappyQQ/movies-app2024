import React, { Component } from 'react';
import { Pagination, message } from 'antd';

import MovieList from '../movie-list/movie-list';
import './index.css';
import MovieService from '../../services/movie-service';
import Loader from '../loader/loader';
import ErrorIndicator from '../error-indicator/error-indicator';
import SearchPanel from '../search-panel/search-panel';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesData: [],
      loading: true,
      error: false,
      searchEmpty: false,
      currentPage: 1,
      totalPages: 1,
      currentQuery: '',
      activeTab: 'search',
      moviesRatings: {},
    };
    this.MovieService = new MovieService();
  }
  onError = (err) => {
    console.error('Error fetching movies data', err);
    this.setState({
      error: true,
      loading: false,
      searchEmpty: false,
    });
  };

  componentDidMount() {
    this.fetchMovies('');
  }

  fetchMovies = (query) => {
    this.setState({ loading: true, error: false, searchEmpty: false, currentQuery: query });
    this.MovieService.getResource(query)
      .then((body) => {
        const moviesData = body.results;
        this.setState({
          moviesData,
          loading: false,
          searchEmpty: moviesData.length === 0,
          currentPage: body.page,
          totalPages: body.total_pages,
        });
      })
      .catch(this.onError);
  };
  // .......
  handlePageChange = (page) => {
    const { currentQuery } = this.state;
    this.setState({ currentPage: page });
    this.fetchMovies(currentQuery, page);
  };

  handleTabChange = (tab) => {
    if (tab === 'rated') {
      this.setState({ loading: true, activeTab: tab });
      this.MovieService.getRatedMovies()
        .then((body) => {
          const moviesData = body.results;
          this.setState({
            moviesData,
            loading: false,
            searchEmpty: moviesData.length === 0,
            currentPage: body.page,
            totalPages: body.total_pages,
          });
        })
        .catch((error) => {
          console.error('Error fetching rated movies', error);
          this.setState({ loading: false, error: true });
        });
    } else {
      this.setState({ activeTab: tab });
      const { currentQuery } = this.state;
      this.fetchMovies(currentQuery);
    }
  };

  handleMovieRate = (id, rate) => {
    this.MovieService.rateMovie(id, rate)
      .then(() => {
        message.success('Movie has been added to rated');
        this.setState((prevState) => ({
          moviesRatings: {
            ...prevState.moviesRatings,
            [id]: rate,
          },
        }));
      })
      .catch((error) => {
        console.error('Error rating movie:', error);
        message.error('Failed to rate movie');
      });
  };

  render() {
    const { moviesData, moviesRatings, loading, error, searchEmpty, currentPage, totalPages, activeTab } = this.state;

    return (
      <div className="container">
        <div className="tab-buttons">
          <button className={activeTab === 'search' ? 'active' : ''} onClick={() => this.handleTabChange('search')}>
            Search
          </button>
          <button className={activeTab === 'rated' ? 'active' : ''} onClick={() => this.handleTabChange('rated')}>
            Rated
          </button>
        </div>
        {activeTab === 'search' && <SearchPanel onSearch={this.fetchMovies} />}
        <div>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorIndicator />
          ) : searchEmpty ? (
            <p className="no-movies">No movies found</p>
          ) : (
            <React.Fragment>
              <MovieList movies={moviesData} onMovieRate={this.handleMovieRate} moviesRatings={moviesRatings} />
              <Pagination
                className="pagination"
                current={currentPage}
                onChange={(page) => this.handlePageChange(page)}
                total={totalPages}
                showSizeChanger={false}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}
