import React, { Component } from "react";
import { format, parseISO } from "date-fns"
import { enUS } from "date-fns/locale"
import PosterLoader from "./poster-loader";

function fixOverview(overview) {
    const maxLength = 210;
    if (overview.length <= maxLength) {
        return overview;
    } else {
        const lastSpaceIndex = overview.lastIndexOf(" ", maxLength);
        if (lastSpaceIndex !== -1) {
            return overview.substring(0, lastSpaceIndex) + "...";
        } else {
            return overview.substring(0, maxLength) + '...';
        }
    }
}

function formatDate(release_date) {
    if(release_date) {
        return format(parseISO(release_date), "MMMM d, yyyy", { locale: enUS });
    } else {
        return "N/A"
    }
    
}



export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLoaded: false
        }
    }

    handleImageLoaded = () => {
        this.setState({ imageLoaded: true })
    }


    render() {
        
        const { title, release_date, overview, poster_path } = this.props
        const { imageLoaded } = this.state

        const fixedOverview = fixOverview(overview);
        const formattedReleaseDate = formatDate(release_date);

        return(
            <li className="movie">
                <div className="movie-poster">
                  {!imageLoaded && <PosterLoader />}
                    <img
                        alt={title}
                        src={`https://image.tmdb.org/t/p/original${poster_path}`}
                        onLoad={this.handleImageLoaded}
                        style={{ display: imageLoaded ? "block" : "none" }}
                    />
                </div>
                <div className="movie-details">
                    <h2 className="movie-title">{title}</h2>
                    <p className="movie-release-date">{formattedReleaseDate}</p>
                    <p className="movie-genres">Драма, спорт</p>
                    <p className="movie-description">{fixedOverview}</p>
                </div>
            </li>

            
        )
    }
}