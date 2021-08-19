const passport = require("passport")
const jwt = require("jsonwebtoken")
const dev = process.env.NODE_ENV !== "production";
const keys = require('../config/keys');

exports.COOKIE_OPTIONS = {
    httpOnly: true,
    // Since localhost is not having https protocol,
    // secure cookies do not work correctly (in postman)
    secure: !dev,
    signed: true,
    maxAge: eval(keys.REFRESH_TOKEN_EXPIRY) * 1000,
    sameSite: "none",
}
exports.getToken = user => {
    return jwt.sign(user, keys.JWT_SECRET, {
        expiresIn: eval(keys.SESSION_EXPIRY),
    })
}
exports.getRefreshToken = user => {
    const refreshToken = jwt.sign(user, keys.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(keys.REFRESH_TOKEN_EXPIRY),
    })
    return refreshToken
}
exports.verifyUser = passport.authenticate(["jwt", "google"], { session: false })