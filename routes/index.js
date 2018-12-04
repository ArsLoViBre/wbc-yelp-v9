var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

// Root route
router.get("/", function(req, res){
    res.render("landing");
});

// =========================
// AUTH ROUTES
// =========================

// Show register form
router.get("/register", function(req, res){
    res.render("register");
});

// Handle sign up logic
router.post("/register", function (req, res) {
    console.log(req.body.username);
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/campgrounds");
            })
        }
    });
});

// Show LogIn form
router.get("/login", function (req, res) {
    res.render("login");
});

// Hadle LogIn logic
router.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}), function (req, res) {
    
});

// LogOut Route
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

 module.exports = router;