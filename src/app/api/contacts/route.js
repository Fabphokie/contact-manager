// pages/api/clients.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db('mmaphokengsenne'); // Use your database name if required
      const clients = await db.collection('clients').find({}).toArray(); // Fetch all clients
      res.status(200).json({ clients });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching clients' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' }); // If not GET method
  }
}

export default handler;
