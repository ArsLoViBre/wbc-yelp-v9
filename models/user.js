var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Add to UserSchema required functionality for password control
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);