const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$_";

const genRandomString = (length) => {
    let genString = "";

    for (var i = 0; i < length; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        genString += chars.substring(randomNumber, randomNumber + 1);
    }
    return genString;
}

module.exports = genRandomString;