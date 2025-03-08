
import mongoose from "mongoose";
const topPlayingSchema= mongoose.Schema({
    movieName:{type:String, },
    moviePicture:{type:String},
    movieWatchingDate:{type:Date},
    MoviePrice:{type:String},
    movieDescription:{type:String}
})

const topPlayingModel = mongoose.model("topMovies", topPlayingSchema)

export default topPlayingModel