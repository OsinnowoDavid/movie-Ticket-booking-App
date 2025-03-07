import express from "express"
import upload from "../middilwear/multer.js"
import { addMovies, getMoviesById, editMovies, deleteMovies, getMovies } from "../controllers/nowPlayingController.js"

const nowPlayingRoute = express.Router()

// Ensure the upload middleware is used before the addMovies controller
nowPlayingRoute.post("/addnowgmovies", upload.fields([{name:"moviePicture",maxCount:1}]), addMovies)
nowPlayingRoute.put("/editnowgmovies/:id", editMovies)
nowPlayingRoute.get("/getnowmovies", getMovies)
nowPlayingRoute.get("/getnowmoviesById/:id", getMoviesById)
nowPlayingRoute.delete("/deletenowmovies/:id", deleteMovies)

export default nowPlayingRoute