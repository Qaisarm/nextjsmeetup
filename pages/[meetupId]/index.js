import {MongoClient, ObjectId} from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail'

function MeetupDetails(props){
    return(
        <MeetupDetail
        image = {props.meetupData.image}
        title={props.meetupData.title}
        address = {props.meetupData.address}
        description = {props.meetupData.description}
        />
    );

}
export async function getStaticPaths(){
    const client = await MongoClient.connect(
            "mongodb://admin:wmzrnxfaoiuQq3fB@ac-hcoylfa-shard-00-00.yjkxbcc.mongodb.net:27017,ac-hcoylfa-shard-00-01.yjkxbcc.mongodb.net:27017,ac-hcoylfa-shard-00-02.yjkxbcc.mongodb.net:27017/?ssl=true&replicaSet=atlas-zz8vzk-shard-0&authSource=admin&retryWrites=true&w=majority"
          );
        
          const db = client.db();
          const meetupsCollection = db.collection("meetups");
        
          const meetups = await meetupsCollection.find({}, {_id: 1 }).toArray();
          client.close();
          
          return {
            fallback:false,
            paths: meetups.map((meetup)=> ({
                params:{ meetupId: meetup._id.toString()},
            })),
          };
}
export async function getStaticProps(context){
    
    const meetupId = context.params.meetupId;
    
    const client = await MongoClient.connect(
      "mongodb://admin:wmzrnxfaoiuQq3fB@ac-hcoylfa-shard-00-00.yjkxbcc.mongodb.net:27017,ac-hcoylfa-shard-00-01.yjkxbcc.mongodb.net:27017,ac-hcoylfa-shard-00-02.yjkxbcc.mongodb.net:27017/?ssl=true&replicaSet=atlas-zz8vzk-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
    
      const selectedMeetup = await meetupsCollection.findOne({
        _id:ObjectId(meetupId),

      });
      client.close();
      return {
        props:{
            meetupData: {

            id: selectedMeetup._id.toString(),
            title: selectedMeetup.title,
            address: selectedMeetup.address,
            image :selectedMeetup.image,
            description:selectedMeetup.description,

            },
        },
      };
      
}
export default MeetupDetails;

