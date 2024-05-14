import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://fatimaasebbane2002:fatilwarda123@myfirstcluster.sjkaq01.mongodb.net/Thinkable_challenge'; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        return client.db(); 
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas', error);
        throw new Error('Could not connect to MongoDB Atlas');
    }
}

export { connectDatabase };