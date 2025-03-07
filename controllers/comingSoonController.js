import ComingSoonMoviesModel from "../models/comingSoonSchema.js"
import { comingSoon } from "../utils/validator.js";
import {v2 as cloudinary} from "cloudinary"
import mongoose from "mongoose";
// import connectcloudinary from "../config/cloudinary.js"
const addMovies = async (req, res) => {
    try {
        // Access the uploaded file from req.files
        const moviePicture = req.files.moviePicture ? req.files.moviePicture[0] : null;
        
        // Ensure moviePicture is included in the validation payload
        const validationPayload = { ...req.body, moviePicture };
        const { error, value } = comingSoon(validationPayload);
        
        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
        if (!value) {
            return res.status(400).json({ success: false, message: "Validation failed" });
        }
        const { movieName, moviesWatchingDate, MovieDescription } = req.body;
        
        let imageUrl = await cloudinary.uploader.upload(moviePicture.path, { resource_type: "image" });
        
        const movieDetails = { movieName, moviePicture: imageUrl.secure_url, moviesWatchingDate, MovieDescription };

        const moviesDate = new ComingSoonMoviesModel(movieDetails);

        await moviesDate.save();
        res.status(200).json({ message: "movie added successfully", success: true });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
    }
}

const editMovies = async (req, res) => {
    try {
        const { id } = req.params;
        const editMovies = await ComingSoonMoviesModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "coming soon movie edited successfully", success: true, data: editMovies });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
    }
}

const deleteMovies = async (req, res) => {
    try {
        const { id } = req.params;
        await ComingSoonMoviesModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "movie deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
    }
}

const getMovies = async (req, res) => {
    try {
        const allMovies = await ComingSoonMoviesModel.find()
        res.status(200).json({ success: true, data: allMovies });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
    }
}

const getMoviesById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate the id parameter
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid movie ID" });
        }
        
        const singleMovie = await ComingSoonMoviesModel.findById(id);
        if (!singleMovie) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }
        
        res.status(200).json({ success: true, message: "single coming soon movie", data: singleMovie });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
    }
}

export { addMovies, getMoviesById, editMovies, deleteMovies, getMovies }