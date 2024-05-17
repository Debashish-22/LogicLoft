const cookieParser = (req) => {
    
    const cookieString = req.headers.cookie;

    if (!cookieString) return {};

    const pairs = cookieString.split(";");

    const cookieObj = pairs.reduce((obj, pair) => {
        const [key, value] = pair.split("=").map(cookie => decodeURIComponent(cookie.trim()));
        obj[key] = value;
        return obj;
    }, {});

    return cookieObj;
};

module.exports = cookieParser;
