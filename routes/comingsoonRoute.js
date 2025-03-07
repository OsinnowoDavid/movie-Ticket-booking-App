import express from "express"
import upload from "../middilwear/multer.js"
import { addMovies, getMoviesById, editMovies, deleteMovies, getMovies } from "../controllers/comingSoonController.js"

const comingMoviesRoutes = express.Router()

// Ensure the upload middleware is used before the addMovies controller
comingMoviesRoutes.post("/addcomingmovies", upload.fields([{name:"moviePicture",maxCount:1}]), addMovies)
comingMoviesRoutes.put("/editcomingmovies/:id", editMovies)
comingMoviesRoutes.get("/getcomingmovies", getMovies)
comingMoviesRoutes.get("/getcomingmoviesById/:id", getMoviesById)
comingMoviesRoutes.delete("/deletecomingmovies/:id", deleteMovies)

export default comingMoviesRoutes