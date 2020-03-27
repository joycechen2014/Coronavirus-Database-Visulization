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
				res.render("loggedin", { name: req.session.user.username });
			} else {
				res.render("index", { message: "Username or password invalid!" });
			}
		}
	});
};

/*
 * GET charts page.
 */
module.exports.get_charts= function(req, res)
{
	var db = req.db;
	var collection = db.get("data");
	let docs = collection.find();
	res.render("charts", { datalist: docs });
};


/*
 * GET management page.
 */
module.exports.get_management = function (req, res) {
	if (req.session.user === "admin") {
		var db = req.db;
		var collection = db.get("data");
		// let datalist = await collection.find({}).sort({dt: -1});
		// res.render("management", { datalist: datalist });

		collection.find({}, {sort: {dt : -1}}, function (err, docs) {
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
	var collection = db.get("data");
	let datalist = await collection.find();
	if (!req.body.countryname) {
		res.render("management", {
			datalist: datalist,
			message: "Country Name can not be empty!"
		});
	} else if (!req.body.date) {
		res.render("management", {
			datalist: datalist,
			message: "Date can not be empty!"
		});
	} else if (!req.body.type) {
		res.render("management", {
			datalist: datalist,
			message: "Type can not be empty!"
		});
	} else if (!req.body.totalnumber) {
		res.render("management", {
			datalist: datalist,
			message: "Total Number can not be empty!"
		});
	} else if (!req.body.newnumber) {
		res.render("management", {
			datalist: datalist,
			message: "New Number can not be empty!"
		});
	} else {
		var db = req.db;
		var country = req.body.countryname;
		var dt = req.body.date;
		var type = req.body.type;
		var totalnum = req.body.totalnumber;
		var newnum = req.body.newnumber;
		var id = req.body.id;
		try {
			await collection.insert({
				country: country,
				dt: dt,
				type: type,
				totalCases: totalnum,
				newCases: newnum,
				dt: dt
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
	var collection = db.get("data");
	let datalist = await collection.find();
	if (!req.body.countryname) {
		res.render("management", {
			datalist: datalist,
			message: "Country Name can not be empty!"
		});
	} else if (!req.body.date) {
		res.render("management", {
			datalist: datalist,
			message: "Date can not be empty!"
		});
	} else if (!req.body.type) {
		res.render("management", {
			datalist: datalist,
			message: "Type can not be empty!"
		});
	} else if (!req.body.totalnumber) {
		res.render("management", {
			datalist: datalist,
			message: "Total Number can not be empty!"
		});
	} else if (!req.body.newnumber) {
		res.render("management", {
			datalist: datalist,
			message: "New Number can not be empty!"
		});
	}  else {
		var db = req.db;
		var country = req.body.countryname;
		var dt = req.body.date;
		var type = req.body.type;
		var totalnum = req.body.totalnumber;
		var newnum = req.body.newnumber;
		var id = req.body.id;
		console.log("Data update");
		console.log(req.body)
		try {
			await collection.findOneAndUpdate({ _id: id }, {$set:{
				country: country,
				dt: dt,
				type: type,
				totalCases: totalnum,
				newCases: newnum,
				dt: dt
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
	var collection = db.get("data");
	var fs = req.fs;
	var csv = req.csv;
	
	console.log("remove old record");
	collection.remove({});

	const dataset = [];

	fs.createReadStream('public/data/us-covid-19-case.csv')
		.pipe(csv())
		.on('data', (data) => dataset.push(data))
		.on('end', async () => {
			for(let i = 0; i < dataset.length; i++){
					 collection.insert(
						{
							"country": "US",
							"dt" : dataset[i].Date,
							"type": dataset[i].Type,
							"totalCases": dataset[i].TotalCases,
							"newCases": dataset[i].NewCases,
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

	// res.send("Finish to load");

	
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

