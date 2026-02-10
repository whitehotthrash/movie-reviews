import express from "express";

const router = express.Router(); // get access to express router

router.route("/").get((request, response) => response.send("hello world"));

export default router;
