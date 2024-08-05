const dbs = require("../Database/mongodb");
class Auth {
    constructor(email, confirm_email, password) {
        this.email = email,
            this.confirm_email = confirm_email,
            this.password = password
    }

    async save() {
        await dbs.getdb().collection("userdata").insertOne({
            email: this.email,
            confirm_email: this.confirm_email,
            password: this.password
        });
    }
    async get_data()
    {
        const user = await dbs.getdb().collection("userdata").findOne({ email: this.email });
        return user;
    };
}



module.exports = Auth;