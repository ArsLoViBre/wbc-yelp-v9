var express     = require("express"),
    app         = express(),
    // Body Parser (middleware) needs to handle HTTP POST requests
    // Body Parser extract the entire body portion of an incoming request stream and exposes it on req.body as an object
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds.js");
// Requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
const hostname  = '127.0.0.1',
      port      = 3000;
      
// Uncomment to seed the DB
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Secret phrase",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// This code will run on every page and provide ability to use currentUser on any page with header
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    // This will continue other code
    next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
// Tells app to use Body Parser to handle POST requests
app.use(bodyParser.urlencoded({extended: true}));
// Help to rid off writing every time something like "landing.ejs"
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.listen(port, hostname, () => {
    console.log(`Server up and run at http://${hostname}:${port}/`);
});