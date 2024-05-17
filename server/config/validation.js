const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const usernameMinLen = 3;

const pwdMinLen = 8;

module.exports = {
    saltRounds,
    emailRegex,
    usernameMinLen,
    pwdMinLen
}