import clientPromise from '../../../lib/mongodb';

export async function GET(req) {
  try {
    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db('mmaphokengsenne');
    const contactsCollection = db.collection('contacts');

    // Fetch all contacts from the 'contacts' collection
    const contacts = await contactsCollection.find().toArray();

    // Return the fetched contacts as a JSON response
    return new Response(JSON.stringify({ contacts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);

    // Handle server errors
    return new Response(
      JSON.stringify({ error: 'Failed to fetch contacts' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
