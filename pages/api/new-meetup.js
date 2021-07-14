import { MongoClient } from 'mongodb'

// api/new-meetup
// POST /api/new-meetup
async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // const { title, image, address, descriptionn } = data;

    const client = await MongoClient.connect('mongodb+srv://dalivanmail:03dzNi0ug59m0KFX@cluster0.8tuvj.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup innserted!' });
  }
}

export default handler;