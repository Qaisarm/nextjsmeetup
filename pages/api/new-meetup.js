import {MongoClient} from 'mongodb'

async function handler(req,res){
    if(req.method ==='POST'){
        const data = req.body;

        const client = await MongoClient.connect(
            "mongodb://admin:wmzrnxfaoiuQq3fB@ac-hcoylfa-shard-00-00.yjkxbcc.mongodb.net:27017,ac-hcoylfa-shard-00-01.yjkxbcc.mongodb.net:27017,ac-hcoylfa-shard-00-02.yjkxbcc.mongodb.net:27017/?ssl=true&replicaSet=atlas-zz8vzk-shard-0&authSource=admin&retryWrites=true&w=majority"
          ); 
const db = client.db();
const meetupCollection = db.collection('meetups');
const result = await meetupCollection.insertOne(data);
client.close();

res.status(201).json({message: 'Data Inserted'});
}
}
export default handler;