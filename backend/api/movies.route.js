import express from "express";
import MoviesController from "./movies.controller.js"

const router = express.Router(); // get access to express router

// GET
router.route("/").get(MoviesController.apiGetMovies);

// POST

// PATCH

// DELETE

export default router;
