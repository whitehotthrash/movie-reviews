// Data access object

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  // establish connection for routes
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("reviews");
    } catch (e) {
      console.error(
        `Unable to establish connection handle in reviewsDAO: ${e}`,
      );
    }
  }

  static async addReview(movieId, user, review, date) {
    // add review via controller
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        review: review,
        movie_id: ObjectId(movieId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review : ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, review, date) {
    // update review via controller
    try {
      const updateResponse = await reviews.updateOne(
        {user_id: userId, _id:ObjectId(reviewId)},
        {$set:{review: review, date: date}}
      )
      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
    }
  }

  static async deleteReview(reviewId, userId) {
    // delete review via controller
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      })
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }
}
