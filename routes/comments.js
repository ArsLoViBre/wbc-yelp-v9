var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

// ===========================
// COMMENTS ROUTES
// ===========================

// Comments New
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    // Finds campgrpund bi ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            // Render the page with the comment form and send commenting campground there
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comments Create
router.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
   // Lookup campground using ID
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          // Create a new comment
          Comment.create(req.body.comment, function (err, comment) {
             if (err) {
                 console.log(err);
             } else {
                 // Add username & id to comment
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username;
                 // Save comment
                 comment.save();
                 // Connect new comment to campground
                 campground.comments.push(comment);
                 campground.save();
                 // Redirect to campground show page
                 res.redirect('/campgrounds/' + campground._id);
             } 
          });
      } 
   });
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;