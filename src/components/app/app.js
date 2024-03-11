import React, { Component } from "react";
import MovieList from "../movie-list/movie-list";
import "./index.css";
import MovieService from "../../services/movie-service";
import Loader from "../loader/loader";
import ErrorIndicator from "../error-indicator/error-indicator";
import SearchPanel from "../search-panel/search-panel";
import MoviesPagination from "../pagination/pagination";





export default class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			moviesData: [],
			loading: true,
			error: false,
			searchEmpty: false,
			currentPage: 1,
			totalPages: 1,
			currentQuery: ""
		}
		this.MovieService = new MovieService();
	}

	onError = (err) => {
		console.error("Error fetching movies data", err)
		this.setState({
			error: true,
			loading: false,
			searchEmpty: false
		});
	};

	componentDidMount() {
		this.fetchMovies("");
	}

	fetchMovies = (query, page = 1) => {
		this.setState({ loading: true,
						error: false,
						searchEmpty: false,
						currentQuery: query });
		this.MovieService
			.getResource(query, page)
			.then((body) => {
				const moviesData = body.results
				this.setState({
					moviesData,
					loading: false,
					searchEmpty: moviesData.length === 0,
					currentPage: body.page,
					totalPages: body.total_pages
				})
			})
			.catch(this.onError)
	}

	handlePageChange = (page) => {
		const { currentQuery } = this.state;
		this.setState({ currentPage: page })
		this.fetchMovies(currentQuery, page);
	}

    render() {
		const { moviesData, loading, error, searchEmpty, currentPage, totalPages } = this.state;

      return (

			<div className="container">
				<div>
					<SearchPanel onSearch={this.fetchMovies}/>
				</div>
				<div>
				{loading ? (					
				<Loader/>
				) : error ? (
					<ErrorIndicator/>
				) : searchEmpty ? (
					<p className="no-movies">No movies found</p>
				) : (
				<React.Fragment>
              		<MovieList movies={moviesData}/>
                	<MoviesPagination currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={this.handlePageChange} />
            	</React.Fragment>
				)}
				</div>
			</div>
      )
    }
}