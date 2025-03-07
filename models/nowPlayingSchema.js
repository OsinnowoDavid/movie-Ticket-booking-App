
import mongoose from "mongoose";

const nowPlayingSchema= mongoose.Schema({
    movieName:{type:String, },
    moviePicture:{type:String},
    movieWatchingDate:{type:Date},
    movieDescription:{type:String}
})

const nowPlayingModel = mongoose.model("NowPlayingMovies", nowPlayingSchema)

export default nowPlayingModel