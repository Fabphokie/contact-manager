// src/app/api/contacts/link.js
import clientPromise from '../../../lib/mongodb';

export async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { contactId, clientIds } = req.body; // contactId and an array of clientIds

      if (!contactId || !clientIds || !Array.isArray(clientIds)) {
        return res.status(400).json({ error: 'Contact ID and Client IDs are required' });
      }

      const client = await clientPromise;
      const db = client.db('mmaphokengsenne');
      const contactsCollection = db.collection('contacts');

      // Find the contact by contactId
      const contact = await contactsCollection.findOne({ _id: ObjectId(contactId) });

      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      // Add the clientIds to the contact document
      const updatedContact = await contactsCollection.updateOne(
        { _id: ObjectId(contactId) },
        { $addToSet: { clientIds: { $each: clientIds } } } // Ensures no duplicates
      );

      if (updatedContact.modifiedCount > 0) {
        return res.status(200).json({ message: 'Clients linked to contact successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to link clients' });
      }
    } catch (error) {
      console.error('Error linking clients to contact:', error);
      return res.status(500).json({ error: 'Failed to link clients' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
