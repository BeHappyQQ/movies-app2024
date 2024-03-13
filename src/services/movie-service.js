export default class MovieService {
    constructor() {
      this._apiBase = "https://api.themoviedb.org/3";
      this._guestSessionUrl = "/authentication/guest_session/new";
      this._apiKey = "6f72a5ec5e037e3dbf8e22f990a9bbb4";
      this._guestSessionId = null;
      this._token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjcyYTVlYzVlMDM3ZTNkYmY4ZTIyZjk5MGE5YmJiNCIsInN1YiI6IjY1ZTk5NzEzYWY5NTkwMDE4NGRkMGY2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R_MXo9ox6N9Ic35aVwMGSqzMBCCsRPFeNSMfxwMKBLs';
      this.options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: this._token,
          'Content-Type': 'application/json;charset=utf-8'
        }
      };
    }
  
    async createGuestSession() {
      const url = `${this._apiBase}${this._guestSessionUrl}`;
      const res = await fetch(url, this.options);
  
      if (!res.ok) {
        throw new Error(`Could not create guest session, received ${res.status}`);
      }
  
      const data = await res.json();
      this._guestSessionId = data.guest_session_id;
    }
  
    async getResource(query, page = 1) {
      if (!this._guestSessionId) {
        await this.createGuestSession();
      }
  
      const url = `${this._apiBase}/search/movie?&query=${query}&page=${page}&guest_session_id=${this._guestSessionId}`;
      const res = await fetch(url, this.options);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
      }
  
      return await res.json();
    }
  
    async getRatedMovies(page = 1) {
      if (!this._guestSessionId) {
        await this.createGuestSession();
      }
  
      const ratedMoviesUrl = `${this._apiBase}/guest_session/${this._guestSessionId}/rated/movies`;
      const res = await fetch(ratedMoviesUrl, this.options);
  
      if (!res.ok) {
        throw new Error(`Could not fetch rated movies, received ${res.status}`);
      }
  
      return await res.json();
    }
  
    async rateMovie(movieId, rate) {
      try {
        const rateMovieUrl = `${this._apiBase}/movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${this._guestSessionId}`;
        const options = {
          method: 'POST',
          headers: this.options.headers,
          body: JSON.stringify({ value: rate })
        };
  
        const response = await fetch(rateMovieUrl, options);
        const responseData = await response.json();
  
        if (!response.ok) {
          throw new Error(`Could not rate movie, received ${response.status}`);
        }
  
        console.log('Успешно добавлен рейтинг для фильма:', responseData);
        return responseData;
      } catch (error) {
        console.error('Ошибка при добавлении рейтинга:', error);
        throw error;
      }
    }


    async fetchGenres() {
        const url = `${this._apiBase}/genre/movie/list`;
        const res = await fetch(url, this.options);

        if (!res.ok) {
            throw new Error(`Could not fetch genres, received ${res.status}`);
          }
      
        return await res.json();
    }
  }
