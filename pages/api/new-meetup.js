import {MongoClient} from 'mongodb'

async function handler(req,res){
    if(req.method ==='POST'){
        const data = req.body;

const client = await MongoClient.connect(
    'mongodb://qmphy:123Landau2@ac-fy6gdop-shard-00-00.lubgau9.mongodb.net:27017,ac-fy6gdop-shard-00-01.lubgau9.mongodb.net:27017,ac-fy6gdop-shard-00-02.lubgau9.mongodb.net:27017/?ssl=true&replicaSet=atlas-vwcbfm-shard-0&authSource=admin&retryWrites=true&w=majority')
   
const db = client.db();
const meetupCollection = db.collection('meetups');
const result = await meetupCollection.insertOne(data);
client.close();

res.status(201).json({message: 'Data Inserted'});
}
}
export default handler;