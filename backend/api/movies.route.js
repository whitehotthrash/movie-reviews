import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";

const router = express.Router(); // get access to express router

// GET
router.route("/").get(MoviesController.apiGetMovies);
// router.route("/id/:id").get(MoviesController.apiGetMovieById);
// router.route("/ratings").get(MoviesController.apiGetRatings);

router
  .route("/review")
  .post(ReviewsController.apiPostReview)      // POST
  .put(ReviewsController.apiUpdateReview)     // PUT
  .delete(ReviewsController.apiDeleteReview); // DELETE

export default router;
