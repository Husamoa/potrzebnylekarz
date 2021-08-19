const passport = require('passport');
const jwt = require("jsonwebtoken")
const {getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser} = require("../middlewares/authenticate")
const mongoose = require('mongoose');
const keys = require('../config/keys');
const isLoggedIn = require("../middlewares/isLoggedIn")
const bcrypt = require("bcryptjs");



const User = mongoose.model('users');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

  app.get(
      '/auth/google/callback',
      passport.authenticate('google'),
      (req, res) => {
          res.redirect('/profile')
      }
  );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })

    app.post("/api/register", async (req, res, next) => {
        // Verify that first name is not empty
        if (!req.body.firstName) {
            res.statusCode = 500
            res.send({
                name: "FirstNameError",
                message: "The first name is required",
            })
        } else {
            const user = await User.register(
                new User({username: req.body.username, email: req.body.username}),
                req.body.password,
                (err, user) => {
                    if (err) {
                        res.statusCode = 500
                        res.send(err);
                        next(err);
                    } else {
                        user.firstName = req.body.firstName
                        user.lastName = req.body.lastName || ""
                        const token = getToken({_id: user._id})
                        const refreshToken = getRefreshToken({_id: user._id})
                        user.refreshToken.push({refreshToken})
                        user.password = bcrypt.hashSync(req.body.password, 10)
                        user.save((err, user) => {
                            if (err) {
                                res.statusCode = 500
                                res.send(err);
                                next(err);
                            } else {
                                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                                res.send({success: true, token, user})
                            }
                        })
                    }
                }
            )
        }
    })

    app.post("/api/login", (req,res,next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return res.status(400).send({error: err});
            } else if (!user) {
              return res.send({error : info.message})
            } else if ( user ) {
                const token = getToken({ user })
                const refreshToken = getRefreshToken({ user })
                User.findById(user.id).then(
                    user => {
                        user.refreshToken.push({ refreshToken })
                        user.save((err, user) => {
                            if (err) {
                                res.statusCode = 500
                                res.send(err)
                            } else {
                                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                                res.send({ success: true, token, user })
                            }
                        })
                    },
                    err => next(err)
                )
            }
        })(req,res,next);
    })

    app.post("/api/refreshToken", async (req, res, next) => {
        const {signedCookies = {}} = req
        const {refreshToken} = signedCookies
        if (refreshToken) {
            try {
                const payload = jwt.verify(refreshToken, keys.REFRESH_TOKEN_SECRET)
                const userId = payload._id
                const user = await User.findOne({_id: userId})

                if (user) {
                    // Find the refresh token against the user record in database
                    const tokenIndex = user.refreshToken.findIndex(
                        item => item.refreshToken === refreshToken
                    )
                    if (tokenIndex === -1) {
                        res.statusCode = 401
                        res.send("Unauthorized")
                    } else {
                        const token = getToken({_id: userId})
                        // If the refresh token exists, then create new one and replace it.
                        const newRefreshToken = getRefreshToken({_id: userId})
                        user.refreshToken[tokenIndex] = {refreshToken: newRefreshToken}
                        user.save((err, user) => {
                            if (err) {
                                res.statusCode = 500
                                res.send(err);
                                next(err)
                            } else {
                                res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                                res.send({success: true, token, user})
                            }
                        })
                    }
                } else {
                    res.statusCode = 401
                    res.send("Unauthorized")
                }
            } catch (err) {
                res.statusCode = 401
                res.send("Unauthorized")
            }
        } else {
            res.statusCode = 401
            res.send("Unauthorized")
        }
    })

};
