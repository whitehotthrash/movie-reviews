import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
  static async apiGetMovies(request, response, next) {
    const moviesPerPage = request.query.moviesPerPage
      ? parseInt(request.query.moviesPerPage)
      : 20;
    const page = request.query.page ? parseInt(request.query.page) : 0;

    let filters = {};
    if (request.query.rated) {
      filters.rated = request.query.rated;
    } else if (request.query.title) {
      filters.title = request.query.title;
    }

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    let responseObj = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };
    response.json(responseObj);
  }

  static async apiGetMovieById(request, response, next) {
    try {
      // look for id param
      let id = request.params.id || {};
      let movie = await MoviesDAO.getMovieById(id);

      // if movie doesn't exist
      if (!movie) {
        response.status(404).json({ error: "not found" });
        return;
      }

      response.json(movie);
    } catch (e) {
      console.log(`api, ${e}`);
      response.status(500).json({ error: e });
    }
  }

  static async apiGetRatings(request, response, next) {
    try {
      let propertyTypes = await MoviesDAO.getRatings();
      response.json(propertyTypes);
    } catch (e) {
      console.log(`api, ${e}`);
      response.status(500).json({ error: e });
    }
  }
}
