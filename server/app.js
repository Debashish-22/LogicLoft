require("dotenv").config();

const PORT = process.env.PORT || 443;

const express = require("express");
const cors = require('cors');
// const https = require('https');

const db = require("./config/connection");

const router = require("./routes/index");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
}));

app.use(express.json());

app.use((err, req, res, next) => {

    // Check if error is due to JSON parsing
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      // Bad JSON syntax error
      return res.status(400).json({ success: "false", error: 'Invalid JSON syntax' });
    }
  
    // Other types of errors
    console.error(err);
    res.status(500).json({ success: "false", error: 'Internal server error' });
});

app.use("/api", router);

db.on('error', () => {

    console.log("Error connecting to Database");

    res.status(500).json({
        message: "Internal Server Error"
    });
});

// const server = https.createServer({}, app);

db.once('open', () => {

    console.log("Successfully connected to Database");

    app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
});