const rp = require("request-promise");
const MongoClient = require('mongodb').MongoClient;





const GetData = async () => {
    let options = {
        uri:"https://api.github.com/users/mralexgray/repos",
        headers:{
            'user-agent': 'node.js'
        }
    }

    const res =  await rp(options);
    const parsedRes = JSON.parse(res);
    console.log(parsedRes)
    MongoClient.connect('mongodb+srv://maheshDB:Brillio123@cluster0-aw04j.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
        if (err) { return console.log(err); }
        db = client.db('Cluster0');
        db.collection("Github").insertMany(parsedRes, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            
          });
      });

}


// module.exports = {
//     GetData,
// };

GetData()