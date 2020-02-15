const rp = require("request-promise");
const MongoClient = require('mongodb').MongoClient;
const { DbConfig } = require(`../config/configuration`);

const CreateDbRecord = async (req, res) => {
    let options = {
        uri:"https://api.github.com/users/mralexgray/repos",
        headers:{
            'user-agent': 'node.js'
        }
    }
    const result =  await rp(options);
    const parsedRes = JSON.parse(result);
    console.log(parsedRes)
    MongoClient.connect(DbConfig.Url, (err, client) => {
        if (err) { return console.log(err); }
        db = client.db(DbConfig.dataBase);
        db.collection(DbConfig.collection).insertMany(parsedRes, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
          });
      });
            res.status(200).send({
                response: {
                    message: `records were copied from API to DB`
                }
        });
}

const findOneById= async (req,res) => {

    let RecordID=parseInt(req.params.id);
    console.log(RecordID)
    const uri = "mongodb+srv://maheshDB:Brillio123@cluster0-aw04j.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
 
    try {
        await client.connect();
        result = await client.db("Cluster0").collection("Github").findOne({ id: RecordID });
        console.log(result)
                if (result) {
                    console.log(`Below is the details for client ${RecordID} :`);
                    console.log(result);
                } else {
                    console.log(`Client ${RecordID} not found in DB `);
                }

                res.status(200).send({
                    response:result 
                });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


module.exports = {
    CreateDbRecord,
    findOneById
};
