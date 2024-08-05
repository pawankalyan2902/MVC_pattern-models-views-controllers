const dbs=require("../Database/mongodb");
const mongodb=require("mongodb");
const ObjectId=mongodb.ObjectId
class Post{
    static test = "hello";
    constructor(title,content,id)
    {
        this.title=title,
        this.content=content,
        this.id=id;
    }
    async save()
    {
        await dbs.getdb().collection("posts").insertOne({
            title:this.title,
            content:this.content
        });
        return;
    }
    async delete()
    {
        await dbs.getdb().collection("posts").deleteOne({ _id: new ObjectId(this.id) });
    }
   static async fetchall()
    {
       const post= await dbs.getdb().collection("posts").find({}).toArray();
        return post;
    }
    async post()
    {
        if(!this.id)
        {
            return;
        }
        const data = await dbs.getdb().collection("posts").findOne({ _id: new ObjectId(this.id) });
        return data;
    }
}



module.exports=Post;