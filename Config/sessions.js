const sessions=require("express-session");

//connect mongodb (session)
const sessionStoringPackage=require("connect-mongodb-session");
const connect=sessionStoringPackage(sessions); 

function sessionStorage(){
const sessionStore=new connect({
    uri:"mongodb://localhost:27017",
    databaseName:"mvc_dbs",
    collection:"session"
});
return sessionStore;
}

function createSession()
{
    return sessions({
        secret: 'secret-code',
        resave: false,
        saveUninitialized: false,
        store:sessionStorage()     
    });
}

module.exports={
    createSession:createSession
}

