module.exports.post_register = function(req, res){
    if(!req.body.username)
    {
    	res.render('/register' ,{message: "Username can not be empty!"});
    }
    else if (!req.body.password) {
    	res.render('/register', {message: "Password can not be empty!"});
    }
    else  {
    		var db = req.db;
    		var name = req.body.username; 
    		var email =req.body.email; 
    		var pass = req.body.password; 
    		var phone =req.body.mobile; 
    		var brithday = req.body.birthdate; 
    		var fn = req.body.firstname; 
    		var ln = req.body.lastname; 
    		var collection = db.get('user');
    		collection.findOne({"username": name}, function(err, docs) {
    			if(err) {
    				res.send("find wrong");
    			}else {
    				if(docs) {
    					res.render('register', {message: "User already registered!"});
    				}else {
    		            // Register a new user.
    		        	collection.insert({  
    		        		"username": name, 
    		        		"firstname" : fn,
    		        		"lastname" : ln,
    		        		"email":email, 
    		        		"password":pass, 
    		        		"phone":phone,
    		        		"birthday" : brithday},function(err, doc){ 
    		        		if (err) throw err; 
    		        		console.log("Record inserted Successfully"); 
    		        		res.render('index',
    		        		{ message: "Please log in!" });
    	    	    }) 
    				}
    			}	
    		
    })
    }
}
/*Post login */
module.exports.post_login = function(req, res)
{
   // console.log("Registered users:"); console.log(registeredUsers);
    console.log("Logging in: " + req.body.username + "/" + req.body.password);
    var db = req.db;
	var name = req.body.username; 
	var pass = req.body.password; 
    var collection = db.get('user');
    collection.find({"username": name, "password":pass}, function(err, docs) {
    	 if (err) {
             res.send("find wrong");
         }
         else {
             if(docs) {
                 console.log("Sucessfully logged in:");
                 req.session.user = req.body.username;
                 console.log(req.session.user.username);
                 res.render('loggedin',
                            { name: req.session.user.username });
            	 
             }else {
            	 res.render('index',
                 		{ message: "Username or password invalid!" });
             }
         }

    });
    
    
};
