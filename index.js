import express from "express"
import cors from "cors" // Ensure correct import
import connectDB from "./config/mongodb.js"
import bodyParser from "body-parser"
import nowPlayingRoute from "./routes/NowPlayingRoutes.js"
import comingMoviesRoutes from "./routes/comingsoonRoute.js"
import connectcloudinary from "./config/cloudinary.js"
import topPlayingMovie from "./routes/topPlayingRoute.js"
import authRoutes from "./routes/authRoutes.js"
const app = express()

connectDB()
connectcloudinary()

// Configure CORS
const corsOptions = {
    origin: ['http://localhost:19000', 'http://localhost:8081'], // Allow React Native development server
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

const port = process.env.PORT

app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.json())

app.use("/api", comingMoviesRoutes)
app.use("/api", nowPlayingRoute)
app.use("/api", topPlayingMovie)
app.use("/api", authRoutes)
 app.get("/", (req, res) => { res.send("Welcome to the movie server") })    
app.listen(port, () => {
    console.log("movie server is running")
})