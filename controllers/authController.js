import userModel from "../models/userSchema.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {validate} from "../utils/validator.js";
import {reset_password_validation} from "../utils/validator.js";
import transporter from "../config/nodemailer.js";

//  register users
const register = async (req, res) => {
    try {
        const {value, error} = validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        const { name, email, password, role } = value;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already registered" });
        }

        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            name,
            email,
            role,
            password: hashPassword,
        });
        await user.save();
        res.sendStatus(200).json({ success: true, message: "Registered successfully" });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email, // Ensure email is correctly passed here
            subject: "Welcome to E-learning ",
            text: `Welcome to E-learning. Your account has been created with email id: ${email} and password: ${password}`,
        });

        res.status(200).json({ success: true, message: "Registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// login users
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password); // Ensure correct field name
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 1 * 24 * 60 * 1000,
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Login successfully",
            text: "You have successfully logged in",
        });

        

        res.status(200).json({
            role: user.role,
            success: true,
            message: "Login successfully",
            token,
            userData: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.status(200).json({ success: true, message: "Logged out" });
    } catch (error) {
        console.error("Error clearing cookie:", error);
        return res.status(500).json({ success: false, message: "Logout failed" });
    }
};

const sendVerifyOTP = async (req, res) => {
    try {
        const { email } = req.body; // Changed adminEmail to email

        const user = await userModel.findOne({ email }); // Changed adminEmail to email

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isVerified) {
            return res.json({ success: false, message: "Account Already Verified" });
        }

        if (!isValidEmail(user.email)) { // Changed adminEmail to email
            return res.status(400).json({ success: false, message: "Invalid email address" });
        }

        const OTP = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = OTP;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email, // Changed adminEmail to email
            subject: "Account Verification OTP",
            text: `Your OTP is ${OTP}, verify your account using this OPT. Note: this OPT expires in 24 hours`,
        });
        res.json({ success: true, message: "Verification OTP sent" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const verifyEmail = async (req, res) => {
    const { Id, OTP } = req.body;
    if (!Id || !OTP) {
        return res.json({ success: false, message: "missing Details" });
    }
    try {
        const user = await adminModel.findById(Id); // Corrected model usage
        if (!user) {
            return res.json({ success: false, message: " User not found" });
        }

        if (Id.verifyOtp === "" || Id.verifyOtp !== OTP) {
            return res.json({ success: false, message: "Invalid OPT" });
        }

        if (Id.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: " OPT expire" });
        }

        user.isVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: "Email verified" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



const sendResetOpt = async (req, res) => {
    const { email } = req.body; // Changed adminEmail to email

    if (!email) { // Changed adminEmail to email
        return res.json({ success: false, message: "Email is required" });
    }

    try {
        const user = await adminModel.findOne({ email }); // Changed adminEmail to email
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const OTP = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOpt = OTP;
        user.resetotpexpireat = Date.now() + 15 * 60 * 1000;

        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email, // Changed adminEmail to email
            subject: "Password reset OTP",
            text: `Your OTP for resetting your password is ${OTP}. Use this OTP to proceed with resetting your password.`,
        });

        return res.json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const resetpassword = async (req, res) => {
    const {value, error} = reset_password_validation(req.body);

    if (error) {
        return res.json({ success: false, message: error.message });
    }

    const { email, OTP, newPassword } = value;

    try {
        const user = await adminModel.findOne({ email }); // Changed adminEmail to email

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.resetOpt === "" || user.resetOpt !== OTP) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.resetotpexpireat < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        const hashedpassword = await bcrypt.hash(newPassword, 10);
        user.adminPassword = hashedpassword;
        user.resetOpt = "";
        user.resetotpexpireat = 0;

        await user.save();

        return res.json({ success: true, message: "Password has been reset successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export { register, login, logout, sendVerifyOTP, verifyEmail, sendResetOpt, resetpassword };