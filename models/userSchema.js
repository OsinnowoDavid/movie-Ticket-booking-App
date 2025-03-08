import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifyOtp: {
        type: String,
    },
    verifyOtpExpireAt: {
        type: Date,
    },
    resetOpt: {
        type: String,
    },
    resetotpexpireat: {
        type: Date,
    },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
