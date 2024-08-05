//requiring the utility functions
const utility = require("../Utility/validation");

//Requiring model containing CRUD operations
const Signup_Model = require("../Models(CRUD)/userdata");

//connection with database
const dbs = require("../Database/mongodb");

//require bcrypt
const bcrypt = require("bcrypt");


function get_signup(req,res)
{
    const inputData = utility.validate_input(req);
    res.render("signup", { inputData: inputData });
};

async function post_signup(req,res)
{
    {
        const data = req.body;
        hashed_password = await bcrypt.hash(data.password, 12);
        const Sign_operations=new Signup_Model(data.email,data.confirm_email,hashed_password);
        const user=await Sign_operations.get_data();

        if (user || data.email != data.confirm_email) {
           utility.post_signup(req,data);
            return res.redirect("/signup");
        }
        try {
            Sign_operations.save();
        } catch (error) {
            res.render(500);
        }
        res.redirect("/login");
    
    };
};


async function post_login(req,res)
{
    //validate the input
    const login_data = req.body;
    const sign_up=new Signup_Model(login_data.email,"","");
    const signup_data=await sign_up.get_data();
    //checks if post exsists
    if (!signup_data) {
        utility.post_login(req,login_data,data={
            message: "User did not signup",
            password: login_data.password
        })
        return res.redirect("login");
    }
    //checks if the password is correct
    const compared_password = await bcrypt.compare(login_data.password, signup_data.password);
    if (!compared_password) {
        utility.post_login(req,login_data,data={
            message: "Invalid login password",
            password: ""
        })
        return res.redirect("login");
    };
    req.session.isAuthenticated = true;
    res.redirect("/admin");
};

function get_login(req,res)
{
        const inputData = utility.validate_input(req);
        res.render("login", { inputData: inputData });;
};

function logout(req,res)
{
    req.session.isAuthenticated = false;
    res.redirect("/");
};




module.exports={
    get_login:get_login,
    post_login:post_login,
    get_signup:get_signup,
    post_signup:post_signup,
    logout:logout
}