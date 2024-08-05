function protect(req,res,next)
{
    if(!res.locals.isAuth)
    {
        res.status(404).render("401");
    }
    next();
};

module.exports={
    protect:protect
}