import { useEffect, useState } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Movie = (props) => { // this could be more explicit
  const { id } = useParams();

  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (!id) return;
    getMovie(id);
  }, [id]);

const deleteReview = (reviewId, index) => {
  if (!props.user) return; // make sure user is logged in

  MovieDataService.deleteReview(reviewId, props.user.id)
    .then(() => {
      setMovie((prevState) => ({
        ...prevState,
        reviews: prevState.reviews.filter((_, i) => i !== index), // create new array, the _ indicates a var we won't use
      }));
    })
    .catch((e) => {
      console.log("An error happened", e);
    });
};

// TODO: move custom styling to .css, refactor
  return (
    <div style={{ paddingTop: "6%" }}>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster + "/100x250"} fluid />
          </Col>
          <Card>
            <Card.Header as="h5">{movie.title}</Card.Header>
            <Card.Body>
              <Card.Text>{movie.plot}</Card.Text>
              {props.user && (
                <Link to={`/movies/${id}/review`}>Add Review</Link>
              )}
            </Card.Body>
          </Card>
          <br />
          <h2>Reviews</h2>
          <br />
          {movie.reviews.map((review, index) => {
            return (
              <div key={index} className="d-flex mb-3">
                <div className="flex-grow-1">
                  <h5>{review.name + " reviewed on " + review.date}</h5>
                  <p>{review.review}</p>
                  {props.user && props.user.id === review.user_id && (
                    <Row>
                      <Col>
                        <Link
                          to={`/movies/${id}/review`}
                          state={{ currentReview: review }}
                        >
                          Edit
                        </Link>
                      </Col>
                      <Col>
                        <Button variant="link" onClick={() => deleteReview(review._id, index)}>Delete</Button>
                      </Col>
                    </Row>
                  )}
                </div>
              </div>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
