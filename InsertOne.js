const MongoClient = require('mongodb').MongoClient;
const rp = require('request-promise');

const InsertOneByOne = async (req,res) => {
    const uri = "mongodb+srv://maheshDB:Brillio123@cluster0-aw04j.mongodb.net/test?retryWrites=true&w=majority";
    let options = {
        uri:"https://api.github.com/users/mralexgray/repos",
        headers:{
            'user-agent': 'node.js'
        }
    }
    const result= await rp(options)
    console.log(`typeof result is ${typeof result}`)
    const parsedResult = JSON.parse(result);
    //console.log(`Parsed result is ${JSON.stringify(parsedResult)}`)
    console.log(`type of vaiable is as follows ` +typeof parsedResult)
    const client = new MongoClient(uri);
    try {
        await client.connect();

        //inserting one by one
        parsedResult.forEach(element => {
             client.db('Cluster0').collection('insertOne').insert(element, (err,res) => {
                if(err) return `error occured ${err}`
                console.log(`Record is inserted`);
            })
        });

        //inserting all together
        await client.db('Cluster0').collection('insertOne').insert(parsedResult, (err,res) => {
            if(err) return `error occured ${err}`
            console.log(`Record is inserted`);
        })
        
        
    } catch (error) {
        
    }
    finally{
        await client.close();
    }
}

InsertOneByOne();