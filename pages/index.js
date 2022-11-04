import { Fragment } from 'react';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';
import {MongoClient} from 'mongodb';

function HomePage(props){
    
    return (
    <Fragment>
    <Head>
        <title>
            React Meetups
        </title>
        <meta
        name='description'
        content='Browse a list of highly active React Meetups'
        />
        
    </Head>
        
        <MeetupList meetups={props.meetups}/>;
    </Fragment>
        );
        
   
}
export async function getStaticProps(){

    const client = await MongoClient.connect(
        'mongodb://qmphy:123Landau2@ac-fy6gdop-shard-00-00.lubgau9.mongodb.net:27017,ac-fy6gdop-shard-00-01.lubgau9.mongodb.net:27017,ac-fy6gdop-shard-00-02.lubgau9.mongodb.net:27017/?ssl=true&replicaSet=atlas-vwcbfm-shard-0&authSource=admin&retryWrites=true&w=majority')
       
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find().toArray();
    client.close();

    return {
        props:{
            meetups: meetups.map((meetup)=>({
                title:meetup.title,
                address:meetup.address,
                image: meetup.image,
                id:meetup._id.toString(),
            }))
        },
        revalidate: 10
    };
}
export default HomePage;