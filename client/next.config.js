require('dotenv').config();

module.exports = {
    env: {
        APP_DOMAIN: process.env.APP_DOMAIN,
        SERVER_API: process.env.SERVER_API,
        AUTH_TOKEN: process.env.AUTH_TOKEN,
        DEVICE_TOKEN: process.env.DEVICE_TOKEN,
        GOOGLE_ROOT_URI: process.env.GOOGLE_ROOT_URI,
        GOOGLE_OAUTH_REDIRECT: process.env.GOOGLE_OAUTH_REDIRECT,
        GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    },
    reactStrictMode: false,
}