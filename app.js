//require express in order to use middleware such as get post and use
const express=require("express");
const app=express();

//database
const dbs=require("./Database/mongodb");

//path
const path=require("path");

//intialize view engine
app.set("view engine","ejs");
const view=path.join(__dirname,"views");
app.set(view);

//Rendering staic file (When there is internal request ,it checks getting into the file);
app.use(express.static("public"));

//decode the data in url
app.use(express.urlencoded({extended:false}));

//sessions
const sessions=require("./Config/sessions");
app.use(sessions.createSession())

//security csrf
const csrf=require("csurf");
app.use(csrf());

//Refactoring the custom middleware
const Auth_middleware=require("./Middlewares/Auth_middleware");
app.use(Auth_middleware);


//refactoring the code
//getting into the file consisting the working of blog_posts
const Blog_routes=require("./Routes/Blog");
//routes containing the working of authentication
const auth_routes=require("./Routes/auth");
app.use("/",auth_routes);
app.use("/",Blog_routes);

app.use(function(error,req,res,next)
{
    console.log(error.message);
    res.render("500")
});

dbs.Createdb().then(function()
{
    app.listen(3000);
})

