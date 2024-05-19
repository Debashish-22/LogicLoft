const express = require("express");
const router = express.Router();

const otpRoutes = require("./otp_routes");

const authRoutes = require("./auth_routes");

const profileRoutes = require("./profile_routes");

const avatarRoutes = require("./avatar_routes");

router.get("/", (req, res) => {

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Authentique | API</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                    .pulse{
                        background: #2dd4bf;
                        position: relative;
                        -ms-transform: none;
                        transform: none;
                    }

                    .pulse::after{
                        content: '';
                        width: 150%;
                        height: 150%;
                        position: absolute;
                        background: #2dd4bf;
                        animation: pulse 2s infinite;
                        opacity: 1;
                        border-radius: 50%;
                        top: -25%;
                        left: -25%
                    }

                    @keyframes pulse {
                        0% {
                            opacity:0.5
                        }
                        70% {
                            opacity:0;
                            transform: scale(1.6)
                        }
                          100% {
                            opacity:0
                        }
                    }
                </style>
            </head>
            <body>
                <div class="h-screen w-full bg-slate-900 flex justify-center items-center">
                    <div>
                        <h1 class="mb-5 text-3xl font-semibold text-white">Authentique | API</h1>
                        <div class="flex items-center gap-3">
                            <div class="pulse h-2 w-2 rounded-full"></div>
                            <span class="text-base font-normal text-teal-400">All system operational.</span>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `;

    res.send(htmlContent);
});

router.use("/otp", otpRoutes);

router.use("/auth", authRoutes);

router.use("/profile", profileRoutes);

router.use("/avatars", avatarRoutes);

router.use("*", (req, res) => {

    return res.status(404).json({
        success: false,
        message: "Sorry, the requested route doesn't exist."
    });
});

module.exports = router;