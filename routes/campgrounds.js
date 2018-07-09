var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");

//INDEX
router.get("/", function(req, res){
 //GET ALL CAMPGROUNDS FROM DB
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
            }else{
                res.render("campgrounds/index", {campgrounds:allcampgrounds, currentUser: req.user});
            }
    })
/*    res.render("campgrounds", {campgrounds:campsites});*/
});

//CREATE
router.post("/", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name:name, image:image, description: description}
    //create new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
    // redirect to campgrounds page
            res.redirect("/campgrounds")
        }
    });
});

//NEW
router.get("/new", function(req, res){
    res.render("campgrounds/new");
    
});

//SHOW - Show more info about one campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;