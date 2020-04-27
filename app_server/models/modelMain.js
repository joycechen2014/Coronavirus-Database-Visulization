module.exports.post_register = function (req, res) {
	if (!req.body.username) {
		res.render("/register", { message: "Username can not be empty!" });
	} else if (!req.body.password) {
		res.render("/register", { message: "Password can not be empty!" });
	} else {
		var db = req.db;
		var name = req.body.username;
		var email = req.body.email;
		var pass = req.body.password;
		var phone = req.body.mobile;
		var brithday = req.body.birthdate;
		var fn = req.body.firstname;
		var ln = req.body.lastname;
		var collection = db.get("user");
		collection.findOne({ username: name }, function (err, docs) {
			if (err) {
				res.send("find wrong");
			} else {
				if (docs) {
					res.render("register", { message: "User already registered!" });
				} else {
					// Register a new user.
					collection.insert(
						{
							username: name,
							firstname: fn,
							lastname: ln,
							email: email,
							password: pass,
							phone: phone,
							birthday: brithday
						},
						function (err, doc) {
							if (err) throw err;
							console.log("Record inserted Successfully");
							res.render("index", { message: "Please log in!" });
						}
					);
				}
			}
		});
	}
};

/*Post login */
module.exports.post_login = function (req, res) {
	// console.log("Registered users:"); console.log(registeredUsers);
	console.log("Logging in: " + req.body.username + "/" + req.body.password);
	var db = req.db;
	var name = req.body.username;
	var pass = req.body.password;
	var collection = db.get("user");
	collection.find({ username: name, password: pass }, function (err, docs) {
		if (err) {
			res.send("find wrong");
		} else {
			if (docs) {
				console.log("Sucessfully logged in:");
				req.session.user = req.body.username;
				console.log(req.session.user);
				// res.render("loggedin", { name: req.session.user.username });
				res.redirect('dashboard');
			} else {
				res.render("index", { message: "Username or password invalid!" });
			}
		}
	});
};

/*
 * GET charts page.
 */
//module.exports.get_charts= function(req, res)
//{
//	var db = req.db;
//	var collection = db.get("data");
//	let docs = collection.find();
//	res.render("charts", { datalist: docs });
//};

module.exports.get_charts= function(req, res)
{
	var db = req.db;
	res.render("dashboard");
	// var collection = db.get("crime");
	// let docs = collection.aggregate({$group: {_id: {$substr: ['$Time', 0, 1]}, count: {$sum: 1}}})
	// res.render("dashboard", { datalist: docs });
	// db.crime.aggregate([{"$group" : {_id:"$Time", count:{$sum:1}}}])
};


/*
 * GET management page.
 */
module.exports.get_management = function (req, res) {
	if (req.session.user === "admin") {
		var db = req.db;
		var collection = db.get("crime");
		// let datalist = await collection.find({}).sort({dt: -1});
		// res.render("management", { datalist: datalist });

		// collection.find({}, {sort: {Date : -1}, limit: 1000}, function (err, docs) {
		collection.find({}, { sort: {Date : -1}, limit: 100 }, function (err, docs) {
			console.log("begin to read data ====================");
			console.log(docs);
			res.render("management", { datalist: docs });
		});
	} else {
		res.send("You need Admin privilege to get in Management page.");
	}
};

/*
 * ADD data to management page.
 */
module.exports.add_management = async function (req, res) {
	var db = req.db;
	var collection = db.get("crime");
	let datalist = await collection.find();
	if (!req.body.incidntnum) {
		res.render("management", {
			datalist: datalist,
			message: "Country Name can not be empty!"
		});
	} else if (!req.body.category) {
		res.render("management", {
			datalist: datalist,
			message: "Date can not be empty!"
		});
	} else if (!req.body.dayofweek) {
		res.render("management", {
			datalist: datalist,
			message: "Type can not be empty!"
		});
	} else if (!req.body.date) {
		res.render("management", {
			datalist: datalist,
			message: "Total Number can not be empty!"
		});
	} else if (!req.body.time) {
		res.render("management", {
			datalist: datalist,
			message: "New Number can not be empty!"
		});
	} else if (!req.body.pddistrict) {
		res.render("management", {
			datalist: datalist,
			message: "New Number can not be empty!"
		});
	} else if (!req.body.resolution) {
		res.render("management", {
			datalist: datalist,
			message: "New Number can not be empty!"
		});
	} else if (!req.body.address) {
		res.render("management", {
			datalist: datalist,
			message: "New Number can not be empty!"
		});
	} else if (!req.body.operations) {
		res.render("management", {
			datalist: datalist,
			message: "New Number can not be empty!"
		});
	} else {
		var db = req.db;
		var innum = req.body.incidntnum;
		var categ = req.body.category;
		var dayof = req.body.dayofweek;
		var date = req.body.date;
		var time = req.body.time;
		var pddis = req.body.pddistrict;
		var resol = req.body.resolution;
		var addre = req.body.address;
		try {
			await collection.insert({
				IncidntNum: innum,
				Category: categ,
				DayOfWeek: dayof,
				Date: date,
				Time: time,
				PdDistrict: pddis,
				Resolution: resol,
				Address: addre
			});
			console.log("New data set added Successfully");
			let datalist = await collection.find({}, {sort: {dt: -1}});
   			res.render("management", { datalist: datalist });
		} catch (e) {
			console.error(e);
			res.send('Server Error')
		}
	}
};


/*
 * UPDATE data of management page.
 */
module.exports.update_management = async function (req, res) {
	console.log("Start updating");
	var db = req.db;
	var collection = db.get("crime");
	let datalist = await collection.find();
	if (!req.body.incidntnum) {
		res.render("management", {
			datalist: datalist,
			message: "Country Name can not be empty!"
		});
	} else if (!req.body.category) {
		res.render("management", {
			datalist: datalist,
			message: "Date can not be empty!"
		});
	} else if (!req.body.dayofweek) {
		res.render("management", {
			datalist: datalist,
			message: "Type can not be empty!"
		});
	} else if (!req.body.date) {
		res.render("management", {
			datalist: datalist,
			message: "Total Number can not be empty!"
		});
	} else if (!req.body.time) {
		res.render("management", {
			datalist: datalist,
			message: "New Number can not be empty!"
		});
	} else if (!req.body.pddistrict) {
		res.render("management", {
			datalist: datalist,
			message: "New Number can not be empty!"
		});
	} else if (!req.body.resolution) {
		res.render("management", {
			datalist: datalist,
			message: "New Number can not be empty!"
		});
	} else if (!req.body.address) {
		res.render("management", {
			datalist: datalist,
			message: "New Number can not be empty!"
		});
	} else if (!req.body.operations) {
		res.render("management", {
			datalist: datalist,
			message: "New Number can not be empty!"
		});
	} else {
		var db = req.db;
		var innum = req.body.incidntnum;
		var categ = req.body.category;
		var dayof = req.body.dayofweek;
		var date = req.body.date;
		var time = req.body.time;
		var pddis = req.body.pddistrict;
		var resol = req.body.resolution;
		var addre = req.body.address;
		console.log("Data update");
		console.log(req.body)
		try {
			await collection.findOneAndUpdate({ _id: id }, {$set:{
				IncidntNum: innum,
				Category: categ,
				DayOfWeek: dayof,
				Date: date,
				Time: time,
				PdDistrict: pddis,
				Resolution: resol,
				Address: addre
			}});
			console.log("Data update Successfully");
			let datalist = await collection.find();
			res.render("management", { datalist: datalist });
		} catch (e) {
			console.error(e);
			res.send('Server Error')
		}
		
		}
};

/*
 * DELETE data from management page.
 */
module.exports.delete_management = async function (req, res) {
  console.log("Start deleting");
  var db = req.db;
  var collection = db.get("data");
  var id = req.body.id;
  console.log(req.body)
  try {
   await collection.findOneAndDelete({ _id: id });
   console.log("Data delete Successfully");
   let datalist = await collection.find({}, {sort: {dt: -1}});
   res.render("management", { datalist: datalist });
  } catch (e) {
   console.error(e);
   res.send('Server Error')
  }
};

/*
 * POST Load data from management page.
 */
module.exports.load_management = function (req, res) {
	console.log("Start loading");
	var db = req.db;
	var collection = db.get("crime");
	var fs = req.fs;
	var csv = req.csv;
	
	console.log("remove old record");
	collection.remove({});

	const dataset = [];

	fs.createReadStream('public/data/sfcrime.csv')
		.pipe(csv())
		.on('data', (data) => dataset.push(data))
		.on('end', async () => {
			for(let i = 0; i < dataset.length; i++){
					 collection.insert(
						{
							"IncidntNum": dataset[i].IncidntNum,
							"Category": dataset[i].Category,
							"Descript": dataset[i].Descript,
							"DayOfWeek": dataset[i].DayOfWeek,
							"Date": dataset[i].Date,
							"Time": dataset[i].Time,
							"PdDistrict": dataset[i].PdDistrict,
							"Resolution": dataset[i].Resolution,
							"Address": dataset[i].Address,
							"X": dataset[i].X,
							"Y": dataset[i].Y,
							"Location": dataset[i].Location,
						},function (err, doc) {
							if (err) throw err;
							console.log("Record inserted Successfully");
					}
				);	
		};
		let datalist = await collection.find({}, {sort: {dt: -1}});
		res.render("management", { datalist: datalist });
		// res.redirect("/management");
	});
};


/*
 * SEARCH data from management page.
 */
module.exports.search_management = async function (req, res) {
	console.log("Start searching");
	var db = req.db;
	var collection = db.get("data");
	var type = req.params.type;
	console.log(req.params)
	try {
		let datalist = await collection.find({ type: type});
		console.log("Data search Successfully");
		res.render("management", { datalist: datalist });
	} catch (e) {
		console.error(e);
		res.send('Server Error')
	}
};

