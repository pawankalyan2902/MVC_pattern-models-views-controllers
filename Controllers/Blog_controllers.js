//Requiring from Models for Storingf the posts
const post_operations=require("../Models(CRUD)/Blog_operation");

//Welcome page
function welcome_page(req,res)
{
   return res.render("welcome");
}
//controls rendering of admim page
async function Admin_page(req, res) {
    if (req.session.isAuthenticated) {
        let inputData = req.session.input_error;
        if (!inputData)
            inputData = {
                hasError: "",
                message: "",
                title: "",
                content: "",
            }
       const posts= await post_operations.fetchall();
        req.session.input_error = null;
        return res.render("admin", { inputData: inputData, posts: posts})
    }
}

//Controls creation of post
async function Post_submit(req, res) {
    const data = req.body;
    if (!data.title || !data.content) {
        req.session.input_error = {
            hasError: true,
            message: "Empty content is not allowed",
            title: "",
            content: "",
        };
    }
    const post=new post_operations(data.title,data.content);
    await post.save()
    return res.redirect("/admin")
}

//controls the validation of the post whether it is present or not
async function validate_sigle_post(req, res) {
    const id=req.params.id;
    const post=new post_operations("","",id);
   const data= await post.post()
    if (data) {
        req.session.inputData = {
            title: data.title,
            content: data.content,
            hasError: "",
            message: "",
        }
    } else {
        req.session.inputData = {
            hasError: true,
            message: "Invalid data"
        }
    }

    res.redirect("/single-post");

}

//Controls deletion of single post
async function delete_post(req, res) {
    const id = req.params.id;
   const post=new post_operations("","",id);
   await post.delete()
    res.redirect("/admin");
};

//Controls viewing single post
function view_single_post(req, res) {
    const inputData = req.session.inputData;
    res.render("single-post", { inputData: inputData });
}

module.exports={
    welcome_page:welcome_page,
    Admin_page:Admin_page,
    Post_submit:Post_submit,
    validate_sigle_post:validate_sigle_post,
    delete_post:delete_post,
    view_single_post:view_single_post
};