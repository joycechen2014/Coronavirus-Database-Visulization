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
router.get("/charts", modelMain.get_charts);

/*
 * GET download page.
 */
router.get("/download", ctrlMain.loggedIn, ctrlMain.get_download);

/*
 * GET management page.
 */
router.get("/management", ctrlMain.loggedIn, modelMain.get_management);

/*
 * ADD data to management page.
 */
router.post("/management/add", ctrlMain.loggedIn, modelMain.add_management);

/*
 * Load data of management page.
 */
router.post("/management/load", ctrlMain.loggedIn, modelMain.load_management);

/*
 * UPDATE data of management page.
 */
router.post("/management/update", ctrlMain.loggedIn, modelMain.update_management);

/*
 * DELETE data from management page.
 */
router.post("/management/delete", ctrlMain.loggedIn, modelMain.delete_management);

/*
 * DELETE data from management page.
 */
router.get("/management/search", ctrlMain.loggedIn, modelMain.delete_management);


module.exports = router;

/**
 * http://usejsdoc.org/
 */
