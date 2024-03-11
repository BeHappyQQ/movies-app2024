export default class MovieService {

    // _apiBase = 'https://api.themoviedb.org/3/search/movie?&page=1&query='
    _apiBase = "https://api.themoviedb.org/3/search/movie"

    options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjcyYTVlYzVlMDM3ZTNkYmY4ZTIyZjk5MGE5YmJiNCIsInN1YiI6IjY1ZTk5NzEzYWY5NTkwMDE4NGRkMGY2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R_MXo9ox6N9Ic35aVwMGSqzMBCCsRPFeNSMfxwMKBLs'
        }
      };

    async getResource(query, page = 1) {
      const url = `${this._apiBase}?&query=${query}&page=${page}`;
      const res = await fetch(url, this.options)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return await res.json()
    }
}
