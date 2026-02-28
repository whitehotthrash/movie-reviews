import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  // POST request to add a review
  static async apiPostReview(request, response, next) {
    try {
      const movieId = request.body.movie_id;
      const review = request.body.review;
      const userInfo = {
        name: request.body.name,
        _id: request.body.user_id,
      };
      const date = new Date();

      const ReviewResponse = await ReviewsDAO.addReview(
        movieId,
        userInfo,
        review,
        date,
      );
      response.json({ status: "success " });
    } catch (e) {
      response.status(500).json({ error: e.message });
    }
  }

  // PUT request to edit review
  static async apiUpdateReview(request, response, next) {
    try {
      const reviewId = request.body.review_id;
      const review = request.body.review;
      const date = new Date();

      const ReviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        request.body.user_id,
        review,
        date,
      );
      const { error } = ReviewResponse;
      if (error) {
        response.status.json({ error });
      }
      if (ReviewResponse.modifiedCount === 0) {
        throw new Error(
          "Unable to update review. User may not be original poster.",
        );
      }
      response.json({ status: "Success" });
    } catch (e) {
      response.status(500).json({ error: e.message });
    }
  }
}
