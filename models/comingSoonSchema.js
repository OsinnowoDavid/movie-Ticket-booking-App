
import mongoose from "mongoose";

const comingSoonSchema= mongoose.Schema({
    movieName:{type:String, },
    moviePicture:{type:String},
    movieWatchingDate:{type:Date},
    movieDescription:{type:String}
})

const ComingSoonMoviesModel = mongoose.model("comingSoonMovies", comingSoonSchema)

export default ComingSoonMoviesModel