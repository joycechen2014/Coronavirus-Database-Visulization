var path = require('path');


module.exports.loggedIn = function(req, res, next)
{
    console.log("Checking if logged in:");
    if (req.session.user)
    {
        // Proceed if the user is logged in.
        console.log("Logged in: "); console.log(req.session.user);
        next();
    }
    else
    {
        console.log("Not logged in");
        res.send("You must first log in.");
    }
};
/*
 * Check sign in.
 */
module.exports.checkSignIn = function(req, res, next){
	   if(req.session.user){
	      next();     //If session exists, proceed to page
	   } else {
        res.render('index',{ message: "Please log in!" });
		   //res.render('index.html', res);
	   }
	}

/*
 * GET home page.
 */
module.exports.index = function(req, res, next)
{ 

	 res.render('dashboard', { name: req.session.user.username});
    //res.sendFile(path.join(__dirname+'/../../index.html'));
    console.log('Cookies: ', req.cookies);
    console.log('session: ', req.session.user);
};



/*
 * GET registration page.
 */
module.exports.get_register = function(req, res)
{

	    res.render('register');
};

/*
 * POST login page.
 */
//module.exports.post_login = function(req, res)
//{
//    console.log("Registered users:"); console.log(registeredUsers);
//    console.log("Logging in: " + req.body.username + "/" + req.body.password);
//
//    // Create an array of users with matching credentials.
//    var matches = registeredUsers.filter(function(user)
//                  {
//                      return  (user.username === req.body.username)
//                          && (user.password === req.body.password);
//                  });
//
//    console.log("Matching credentials: "); console.log(matches);
//
//    if (matches.length === 0)
//    {
//
//        res.render('index',
//        		{ message: "Username or password invalid!" });
//    	
//    }
//    else
//    {
//        // The user is logged in for this session.
//        req.session.user = matches[0];
//        console.log("Sucessfully logged in:");
//        console.log(req.session.user.username);
//
//        res.render('loggedin',
//                   { name: req.session.user.username });
//        
//        
//    }
//};

/*
 * GET logout page.
 */
module.exports.get_logout = function(req, res)
{
    console.log("Logging out:");

    if (req.session.user)
    {
        var name = req.session.user.username;
        console.log(name);

        req.session.destroy(function()
        {
            console.log(name + " logged out.");
        });

        res.send(name + " is now logged out.");
    }
    else
    {
        console.log("Nobody is currently logged in!");
        res.send("Nobody is currently logged in!");
    }
};


/*
 * GET dashboard page.
 */
module.exports.get_dashboard = function(req, res)
{

	    res.render('dashboard');
};


/*
 * GET download page.
 */
module.exports.get_download = function(req, res)
{
    res.render('download', { name: req.session.user.username });
};

/*
 * GET FAQ page.
 */
module.exports.get_faq = function(req, res)
{

	    res.render('faq');
};


