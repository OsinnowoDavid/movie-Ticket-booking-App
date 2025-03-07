import express from "express"
import upload from "../middilwear/multer.js"
import { addMovies, getMoviesById, editMovies, deleteMovies, getMovies } from "../controllers/topMoviesController.js"

const topPlayingMovie = express.Router()

// Ensure the upload middleware is used before the addMovies controller
topPlayingMovie.post("/addtopgmovies", upload.fields([{name:"moviePicture",maxCount:1}]), addMovies)
topPlayingMovie.put("/edittopgmovies/:id", editMovies)
topPlayingMovie.get("/gettopmovies", getMovies)
topPlayingMovie.get("/gettopmoviesById/:id", getMoviesById)
topPlayingMovie.delete("/deletenowmovies/:id", deleteMovies)

export default topPlayingMovie