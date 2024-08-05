//refactoring the code
const express = require("express");
const router = express.Router();

//Requiring controller package
const auth_controller=require("../Controllers/auth_controller");



//Sign up page
router.get("/signup", auth_controller.get_signup);

router.post("/signup_form",auth_controller.post_signup);

//login page
router.get("/login", auth_controller.get_login)

//login post
router.post("/login", auth_controller.post_login);

//logout page
router.post("/logout",auth_controller.logout)

module.exports = router;
