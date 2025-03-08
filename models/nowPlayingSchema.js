
import mongoose from "mongoose";

const nowPlayingSchema= mongoose.Schema({
    movieName:{type:String, },
    moviePicture:{type:String},
    movieWatchingDate:{type:Date},
    moviePrice:{type:String},
    movieDescription:{type:String}
})

const nowPlayingModel = mongoose.model("NowPlayingMovies", nowPlayingSchema)

export default nowPlayingModel