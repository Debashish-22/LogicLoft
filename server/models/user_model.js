const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 5,
        max: 25,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    authMode: {
        type: String,
        default: null
    },
    userAvatar:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avatar",
        default: null
    },
    gender: {
        type: String,
        trim: true,
        default: null
    },
    designation: {
        type: String,
        trim: true,
        default: null
    },
    city: {
        type: String,
        trim: true,
        default: null
    },
    state: {
        type: String,
        trim: true,
        default: null
    },
    country: {
        type: String,
        trim: true,
        default: null
    },
    zip: {
        type: String,
        trim: true,
        default: null
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        default: null
    },
    activeStatus: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

module.exports = User;