import express from "express";

const router = express.Router(); // get access to express router

// GET
router.route("/").get((request, response) => response.send("hello world"));

// POST

// PATCH

// DELETE

export default router;
