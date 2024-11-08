import { MongoClient } from 'mongodb';

// The MongoDB URI and database name are pulled from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB; // Make sure to set this in your .env file

// Global variable to hold the MongoClient instance
let client;
let clientPromise;

// Check if we are in a development environment 
if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so that the MongoClient is reused
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's safe to directly instantiate the MongoClient
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  clientPromise = client.connect();
}

export default clientPromise;
