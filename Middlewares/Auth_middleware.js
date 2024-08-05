//custom middleware (Changing the nav bar)
function auth(req,res,next)
{
     res.locals.isAuth=  req.session.isAuthenticated;
     res.locals.token=req.csrfToken();
     next()
};

module.exports=auth;