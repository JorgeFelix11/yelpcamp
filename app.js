var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    seedDB       = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP


app.get("/", function(req, res){
    res.render("landing")
});

//INDEX
app.get("/campgrounds", function(req, res){
    //GET ALL CAMPGROUNDS FROM DB
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
            }else{
                res.render("campgrounds/index", {campgrounds:allcampgrounds});
            }
    })
/*    res.render("campgrounds", {campgrounds:campsites});*/
});

//CREATE
app.post("/campgrounds", function(req, res){
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
            res.redirect("/campgrounds/campgrounds")
        }
    });
});

//NEW
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
    
});

//SHOW - Show more info about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

/*==========================================*/
/* COMMENTS ROUTES*/
/*==========================================*/

app.get("/campgrounds/:id/comments/new", function(req,res){
    //Find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});            
        }
    })

})

app.listen(3000, function(){
    console.log("The YelpCamp has started");
});