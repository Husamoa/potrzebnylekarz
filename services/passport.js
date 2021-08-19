const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require("passport-local").Strategy
const {getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser} = require("../middlewares/authenticate")


const mongoose = require('mongoose');
const keys = require('../config/keys');
const bcrypt = require("bcryptjs");

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then( user => {
        done(null, user);
    })
});

passport.use(
    'google', new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            let existingUser = await User.findOne({userId: profile.id});

            if (existingUser) {
                if (JSON.stringify(existingUser.image) !== JSON.stringify(profile.photos[0].value)) {
                    existingUser.image = profile.photos[0].value;
                    existingUser.save();
                }
                return done(null, existingUser);
            }

            const user = await new User({
                userId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                authStrategy: profile.provider,
                username: profile.emails[0].value,
                email: profile.emails[0].value,
                image: profile.photos[0].value
            }).save();
            done(null, user);
        }
    )
);

//Called during login/sign up.
passport.use('local', new LocalStrategy({
    passReqToCallback: true
    },
    async (req, username, password, done) => {
    let existingUser;
    let matchPassword;
    try {
        existingUser = await User.findOne({username: username});

        if (existingUser) {
            matchPassword = await bcrypt.compareSync(password, existingUser.password)
        }

        if (!existingUser || !matchPassword) {
            return done('Email lub hasło są nieprawidłowe');
        }

    } catch (err) {
        return done(err)
    }



        return done(null, existingUser);

    })
);
