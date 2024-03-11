export default class MovieService {

    _apiBase = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=return'

    options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjcyYTVlYzVlMDM3ZTNkYmY4ZTIyZjk5MGE5YmJiNCIsInN1YiI6IjY1ZTk5NzEzYWY5NTkwMDE4NGRkMGY2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R_MXo9ox6N9Ic35aVwMGSqzMBCCsRPFeNSMfxwMKBLs'
        }
      };

    async getResource() {
        const res = await fetch(this._apiBase, this.options)

        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}, received ${res.status}`)
        }
        return await res.json()
    }
}
