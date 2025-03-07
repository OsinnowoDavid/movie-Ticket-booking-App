import express from "express"
import cor from "cors"
import connectDB from "./config/mongodb.js"
import bodyParser from "body-parser"
import nowPlayingRoute from "./routes/NowPlayingRoutes.js"
import comingMoviesRoutes from "./routes/comingsoonRoute.js"
import connectcloudinary from "./config/cloudinary.js"
import topPlayingMovie from "./routes/topPlayingRoute.js"
const app = express()

connectDB()
connectcloudinary()

app.use(cor())
app.use(express.json())
app.use(bodyParser.json())

app.use("/api",comingMoviesRoutes)
app.use("/api",nowPlayingRoute)
app.use("/api",topPlayingMovie)
app.listen(5000, () =>{
    console.log("movie server is running")
})