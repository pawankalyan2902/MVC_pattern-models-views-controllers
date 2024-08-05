//validates the input data
function validate_input(req)
{
    let inputData = req.session.data;
    if (!inputData) {
        inputData = {
            hasError: "",
            message: "",
            email: "",
            confirmEmail: "",
            password: ""
        }
    }
    req.session.data = null;
    return inputData;
}

function post_signup(req,data)
{
    req.session.data = {
        hasError: true,
        message: "An invalid password entered",
        email: data.email,
        confirmEmail: data.confirm_email,
        password: data.password
    }
}

function post_login(req,login_data,data)
{
    req.session.data = {
        hasError: true,
        email: login_data.email,
       ...data
    }
 
};

module.exports={
    validate_input:validate_input,
    post_login:post_login,
    post_signup:post_signup
}

