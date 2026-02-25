import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
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
}
