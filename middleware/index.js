var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	 //is user logged in
	 if(req.isAuthenticated()){
	        Campground.findById(req.params.id, function(err, foundCampground){
	            if(err || !foundCampground){
                console.log(err);
                  req.flash("error", "There was an error, try again please");
	                res.redirect("/campgrounds");
	            }else{
	                //does user own the campground?
	                //console.log(foundCampground.author.id); //NOT A STRING, MONGOOSE OBJECT, printed look like a string
	                //console.log(req.user._id); //THIS IS A STRING
	                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                    req.campground = foundCampground;
	                  next();
	                }
	                else{
                    req.flash("error", "You Don't Have Permission To Do That");
	                  res.redirect("back");
	                }
	            }
	        });
	    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
	    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    //is user logged in
    if(req.isAuthenticated()){
           Comment.findById(req.params.comment_id, function(err, foundComment){
               if(err || !foundCampground){
                  console.log(err);
                  req.flash("error", "There was an error, try again please");
                  res.redirect("back");
               }else{
                   //does user own the comment?
                  if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                  }
                  else{
                    req.flash("error", "You Don't Have Permission To Do That");
                    res.redirect("back");
                   }
               }
           });
       }else{
          req.flash("error", "You need to be logged in to do that");
          res.redirect("back");
       }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that")
    res.redirect("/login");
}

module.exports = middlewareObj;