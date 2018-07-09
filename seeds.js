var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	data = [
		{
			name: "Cloud's Rest",
			image: "https://media-cdn.tripadvisor.com/media/photo-s/06/48/e8/84/dead-horse-point-state.jpg",
			description: "Donec eu condimentum arcu, quis feugiat tortor. Maecenas nec erat nec erat tempor interdum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse neque tortor, luctus eu nunc id, iaculis mollis tortor. Donec ut mauris ac lacus aliquam suscipit a nec ex. Duis ac rutrum augue. Phasellus eget pulvinar libero. Nullam ultricies turpis quam. Cras euismod non neque a tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed gravida nisi ultricies varius dignissim. Sed ac erat mi. Nunc pretium sem at interdum tempor. Cras consequat rutrum velit quis vulputate. Integer at neque at velit iaculis fringilla."
		},
		{
			name: "Desert Mesa",
			image: "http://1.bp.blogspot.com/_TqY7JA6Z37Y/TKh1LBtaBXI/AAAAAAAABzs/POEPtxAaVUc/s1600/IMG_0949s.jpg",
			description: "Donec eu condimentum arcu, quis feugiat tortor. Maecenas nec erat nec erat tempor interdum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse neque tortor, luctus eu nunc id, iaculis mollis tortor. Donec ut mauris ac lacus aliquam suscipit a nec ex. Duis ac rutrum augue. Phasellus eget pulvinar libero. Nullam ultricies turpis quam. Cras euismod non neque a tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed gravida nisi ultricies varius dignissim. Sed ac erat mi. Nunc pretium sem at interdum tempor. Cras consequat rutrum velit quis vulputate. Integer at neque at velit iaculis fringilla."
		},
		{
			name: "Canyon Floor",
			image: "http://adventure-traveling.com/wp-content/uploads/2017/02/Top-5-Camping-Hiking-Spots-in-Alaska.jpg",
			description: "Donec eu condimentum arcu, quis feugiat tortor. Maecenas nec erat nec erat tempor interdum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse neque tortor, luctus eu nunc id, iaculis mollis tortor. Donec ut mauris ac lacus aliquam suscipit a nec ex. Duis ac rutrum augue. Phasellus eget pulvinar libero. Nullam ultricies turpis quam. Cras euismod non neque a tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed gravida nisi ultricies varius dignissim. Sed ac erat mi. Nunc pretium sem at interdum tempor. Cras consequat rutrum velit quis vulputate. Integer at neque at velit iaculis fringilla."
		}

	];
function seedDB(){
	//REMOVE ALL CAMPGROUNDS
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}else{
			console.log("Campgrounds REMOVED");
			//ADD A FEW CAMPGROUNDS
			data.forEach(function(seed){
				Campground.create(seed, function(err,campground){
					if(err){
						console.log(err);
					}else{
						console.log("Campground added");
						//Create comment
						Comment.create(
								{
									text: "This place is great but I wish there was internet",
									author: "Felix"
								}, function(err, comment){
									if(err){
										console.log(err);
									}else{
										campground.comments.push(comment);
										campground.save();
										console.log("New Comment Created");
									}
									
							})
					}
			});

			});
		}
	});

	
}

module.exports = seedDB;