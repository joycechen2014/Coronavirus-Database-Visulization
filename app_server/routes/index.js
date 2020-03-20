var express = require("express");
var router = express.Router();
var ctrlMain = require("../controllers/main");
var modelMain = require("../models/modelMain")

/*
 * GET home page.
 */
router.get("/",ctrlMain.checkSignIn, ctrlMain.index);

/*
 * GET registration page.
 */
router.get("/register",ctrlMain.get_register);

/*
 * POST registration page.
 */
router.post("/register", modelMain.post_register);


/*
 * POST login page.
 */
router.post("/login", modelMain.post_login);

/*
 * GET logout page.
 */
router.get("/logout", ctrlMain.get_logout);

/*
 * GET charts page.
 */
router.get("/charts", ctrlMain.get_charts);

/*
 * GET download page.
 */
router.get("/download", ctrlMain.loggedIn, ctrlMain.get_download);

module.exports = router;
/**
 * http://usejsdoc.org/
 */
