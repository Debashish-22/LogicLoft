const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deviceId: {
        type: String,
        unique: true,
        required: true
    },
    login:{
        type: Date,
        default: Date.now
    },
    logout:{
        type: Date,
        default: null
    },
    platform:{
        type: String,
        default: null
    },
    expireAt:{
        type: Date,
        expires: "1d"
    }
})

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;