import clientPromise from '../../../lib/mongodb'; // Assuming you have this for DB connection

export async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('mmaphokengsenne'); // Use your database name
  const contactsCollection = db.collection('contacts'); // Use your contacts collection name

  if (req.method === 'GET') {
    try {
      // Fetch all contacts
      const contacts = await contactsCollection.find().toArray();
      res.status(200).json({ contacts }); // Return the contacts as response
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
