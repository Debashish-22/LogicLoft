const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URI);

const db = mongoose.connection;

module.exports = db;