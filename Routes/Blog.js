//refactoring the code
const express = require("express");
const router = express.Router();


//Requiring controller file controller
const blog_controllers=require("../Controllers/Blog_controllers");

const Auth_protection=require("../Middlewares/Auth_controller_protection");

//Welcome page
router.get("/",blog_controllers.welcome_page);

router.use(Auth_protection.protect)

//admin page
router.get("/admin",blog_controllers.Admin_page );

//Admin working Blog data is saved
router.post("/submit",blog_controllers.Post_submit);

//operation in blog posts
router.get("/posts/:id/edit",blog_controllers.validate_sigle_post);

//delete
router.post("/posts/:id/delete",blog_controllers.delete_post);

//single post
router.get("/single-post",blog_controllers.view_single_post) ;




module.exports = router;
