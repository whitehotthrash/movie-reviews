// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Movie from "./components/movie";
import MoviesList from "./components/movies-list";
import AddReview from "./components/add-review";
import Login from "./components/login";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    // default user to null
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }
  // TODO: move custom styling to .css and refactor, no unused vars
  return (
    <div className="App">
      <Navbar bg="light" expand="lg" style={{ position: "fixed", width: "100vw", zIndex: 999 }}>
        <Navbar.Brand href="#home">
          <Link
            to={"/"}
            style={{
              paddingLeft: "5%",
              color: "black",
              textDecoration: "none",
            }}
          >
            Movie Reviews
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={"/movies"}>
              Movies
            </Nav.Link>

            {user ? (
              <Nav.Link as={Link} onClick={logout}>
                Logout User
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to={"/login"}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movies/:id/review" element={<AddReview user={user} />} />
        <Route path="/movies/:id" element={<Movie user={user} />} />
        <Route path="/login" element={<Login login={login} />} />
      </Routes>
    </div>
  );
}

export default App;
