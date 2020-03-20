var path = require('path');
var registeredUsers = [{ username: 'guest', password: 'guest' } ];

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

	        res.render('index',
	        		{ message: "Please log in!" });
	   }
	}

/*
 * GET home page.
 */
module.exports.index = function(req, res, next)
{ 

	 res.render('loggedin', { name: req.session.user.username});
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
 * POST registration page.

module.exports.post_register = function(req, res)
{
    if(!req.body.username)
    {
    	res.render('/register' ,{message: "Username can not be empty!"});
    }
    else if (!req.body.password) {
    	res.render('/register', {message: "Password can not be empty!"});
    }
    else {
    	/*
        // Create an array of users with matching usernames.
        var matches = registeredUsers.filter(function(user)
        {
            return user.username === req.body.username;
        });

        // If there is a match, the user has already registered.
        if (matches.length > 0)
        {
        	res.render('register', {message: "User already registered!"});

        }
         
    	
    	
        // Register a new user.
        else
        {
            var newUser = { username: req.body.username,
                            password: req.body.password };
            registeredUsers.push(newUser);
            console.log("New user:"); console.log(newUser);
            console.log("Registered users:"); console.log(registeredUsers);
            res.render('index',
	        		{ message: "Please log in!" });
        }
    }
};
*/
/*
 * GET login page.
 */
//module.exports.get_login = function(req, res)
//{
//   res.render('index', { message: "Please log in!" });
//};

/*
 * POST login page.
 */
module.exports.post_login = function(req, res)
{
    console.log("Registered users:"); console.log(registeredUsers);
    console.log("Logging in: " + req.body.username + "/" + req.body.password);

    // Create an array of users with matching credentials.
    var matches = registeredUsers.filter(function(user)
                  {
                      return  (user.username === req.body.username)
                          && (user.password === req.body.password);
                  });

    console.log("Matching credentials: "); console.log(matches);

    if (matches.length === 0)
    {

        res.render('index',
        		{ message: "Username or password invalid!" });
    	
    }
    else
    {
        // The user is logged in for this session.
        req.session.user = matches[0];
        console.log("Sucessfully logged in:");
        console.log(req.session.user.username);

        res.render('loggedin',
                   { name: req.session.user.username });
    }
};

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
 * GET charts page.
 */
module.exports.get_charts= function(req, res)
{
  res.render('charts');
};

/*
 * GET download page.
 */
module.exports.get_download = function(req, res)
{
    res.render('download', { name: req.session.user.username });
};


/*
 * GET management page.
 */
module.exports.get_management = function(req, res)
{
    // res.render('management');
    console.log(req.session.user);
    if(req.session.user === "admin"){
        res.render('management');
    } else {
        res.send("You need Admin privilege to get in Management page.")
    }
};