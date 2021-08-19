const mongoose = require('mongoose');
const {Schema} = mongoose;

const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const userSchema = new Schema({
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    authStrategy: {
        type: String,
        default: "local",
    },
    refreshToken: {
        type: [Session],
    },
    email: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    password: String,
    userId: String,
    credits: {type: Number, default: 0},
    profileInfo: {
        PWZNumber: {type: String, default: ""},
        specializations: {type: String, default: ""},
        city: {type: String, default: ""},
        availability: {type: String, default: ""}
    }
});

//Remove refreshToken from the response
userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
});

userSchema.plugin(passportLocalMongoose)

mongoose.model('users', userSchema);

