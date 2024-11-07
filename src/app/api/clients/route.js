// src/app/api/clients/route.js

let clients = []; // Temporary storage (use a database in production)

export async function POST(req) {
  const { name, contactPerson, contactEmail, phone, address } = await req.json();

  if (!name || !contactPerson || !contactEmail || !phone || !address) {
    return new Response(
      JSON.stringify({ error: 'All fields are required' }),
      { status: 400 }
    );
  }

  // Create a new client and add it to the array
  const newClient = { name, contactPerson, contactEmail, phone, address };
  clients.push(newClient);

  // Send a success response
  return new Response(
    JSON.stringify({
      message: 'Client added successfully',
      client: newClient,
    }),
    { status: 200 }
  );
}
