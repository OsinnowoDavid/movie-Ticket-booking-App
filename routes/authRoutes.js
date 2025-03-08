import express from "express"
import {register, login, logout, sendVerifyOTP, verifyEmail, sendResetOpt, resetpassword} from "../controllers/authController.js"
const authRoutes = express.Router()

authRoutes.post("/register",register)
authRoutes.post("/login",login)
authRoutes.post("/logout",logout)
authRoutes.post("/sendVerifyOTP",sendVerifyOTP)
authRoutes.post("/verifyEmail",verifyEmail)
authRoutes.post("/sendResetOtp",sendResetOpt)
authRoutes.post("/resetPassword",resetpassword)

export default authRoutes
