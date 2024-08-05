//require mongodb
const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;

let database;
async function Createdb()
{
    const client=await mongoClient.connect("mongodb://localhost:27017");
    database=client.db("mvc_data");
};

function getdb()
{
    return database;
}

module.exports={
    Createdb:Createdb,
    getdb:getdb
}