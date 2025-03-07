import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["instructor", "student"], required: true }
}
)
const userModel = mongoose.model("users" ,authSchema)
export default userModel