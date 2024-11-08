import clientPromise from '../../../lib/mongodb';

export async function POST(req) {
  try {
    // Parse the incoming request body to get client data
    const { name, surname, contactEmail, clientCode } = await req.json();

    // Validate that all required fields are provided
    if (!name || !surname || !contactEmail || !clientCode) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db('mmaphokengsenne'); // Your database name
    const collection = db.collection('client-contact-data'); // Your collection name

    // Create the new client document
    const newClient = {
      name,
      surname,
      contactEmail,
      clientCode,
      createdAt: new Date(),
    };

    // Insert the document into the collection
    const result = await collection.insertOne(newClient);

    // Return a success response with "added successfully" alert
    return new Response(
      JSON.stringify({
        message: 'Client added successfully',
        client: newClient,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error inserting client:", error);

    // Handle server errors
    return new Response(
      JSON.stringify({ error: 'Failed to add client due to server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
