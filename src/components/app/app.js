import React, { Component } from "react";
import MovieList from "../movie-list/movie-list";
import "./index.css";
import MovieService from "../../services/movie-service";
import Loader from "../loader/loader";
import ErrorIndicator from "../error-indicator/error-indicator";





export default class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			moviesData: [],
			loading: true,
			error: false
		}
		this.MovieService = new MovieService();
	}

	onError = (err) => {
		console.error("Error fetching movies data", err)
		this.setState({
			error: true,
			loading: false
		});
	};

	componentDidMount() {
		this.MovieService.getResource()
			.then(body => {
				this.setState({ 
					moviesData: body.results,
					loading: false
				 })
			})
			.catch(this.onError);
	}

    render() {
		const { moviesData, loading, error } = this.state;

      return (
			<section className="container">
				{loading ? (					
				<Loader/>
				) : error ? (
					<ErrorIndicator/>
				) : (
				<MovieList movies={ moviesData }/> 
				)}
			</section>
      )
    }
}