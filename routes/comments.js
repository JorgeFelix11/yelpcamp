var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//COMMENTS NEW
router.get("/new", middleware.isLoggedIn, function(req,res){
    //Find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "There was an error, please try again");
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});            
        }
    });
});


//COMMENT CREATE
router.post("/", middleware.isLoggedIn, function(req,res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "There was an error, please try again");
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "There was an error, please try again");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment Succesfully Created")
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
});

//EDIT COMMENTS ROUTE
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComments){
        if(err){
            req.flash("error", "There was an error, try again please");
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: req.comments});         
        }
    });
});

//COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            req.flash("error", "There was an error, please try again");
            res.redirect("back");
        }else{
            req.flash("success", "Comment Succesfully Updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment DESTROYED");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

module.exports = router;