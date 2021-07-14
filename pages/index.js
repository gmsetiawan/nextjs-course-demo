// import { useEffect, useState } from 'react';
import { MongoClient } from 'mongodb'
import Head from 'next/head'
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList'

// Test using dummy
const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    address: 'Street Name No. 1, City Name 1',
    description: 'This is our first meetup'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1414&q=80',
    address: 'Street Name No. 2, City Name 2',
    description: 'This is our second meetup'
  }
];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )

  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   // send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  // return <MeetupList meetups={loadedMeetups} />
}

// // Server Side Rendering
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from a API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// Static Rendering
export async function getStaticProps() {
  // fetch data from a API

  const client = await MongoClient.connect('mongodb+srv://dalivanmail:03dzNi0ug59m0KFX@cluster0.8tuvj.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();



  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  };
}

export default HomePage;