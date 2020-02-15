const {MongoClient} = require('mongodb');

async function findOneById(){

    let RecordID=6104546
    const uri = "mongodb+srv://maheshDB:Brillio123@cluster0-aw04j.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        result = await client.db("Cluster0").collection("Github").findOne({ id: RecordID });
        console.log(result)
                if (result) {
                    console.log(`Found a listing in the collection with the name '${RecordID}':`);
                    //console.log(result);
                } else {
                    console.log(`No listings found with the name '${RecordID}'`);
                }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

findOneById()