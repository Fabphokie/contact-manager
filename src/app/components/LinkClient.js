import { useState, useEffect } from 'react';

const LinkClient = () => {
  const [contacts, setContacts] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the list of contacts and clients from the API
    const fetchContactsAndClients = async () => {
      try {
        // Fetch contacts
        const contactsResponse = await fetch('/api/contacts');
        const contactsData = await contactsResponse.json();
        if (!contactsResponse.ok) {
          throw new Error('Failed to fetch contacts');
        }
        setContacts(contactsData.contacts);

        // Fetch clients
        const clientsResponse = await fetch('/api/clients');
        const clientsData = await clientsResponse.json();
        if (!clientsResponse.ok) {
          throw new Error('Failed to fetch clients');
        }
        setClients(clientsData.clients);
      } catch (error) {
        setMessage(`Error fetching data: ${error.message}`);
        console.error('Error:', error);
      }
    };

    fetchContactsAndClients();
  }, []);

  const handleLinkContact = async () => {
    if (!selectedContact || !selectedClient) {
      setMessage('Please select both a contact and a client');
      return;
    }

    try {
      const response = await fetch('/api/link-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: selectedClient, contactId: selectedContact }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Contact linked successfully');
      } else {
        setMessage(data.message || 'Error linking contact');
      }
    } catch (error) {
      setMessage('Error linking contact');
      console.error('Error linking contact:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Link Contact to Client</h2>

      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-4">
        {/* Contact Selection */}
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">Select Contact:</label>
          <select
            id="contact"
            value={selectedContact}
            onChange={(e) => setSelectedContact(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Contact</option>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <option key={contact._id} value={contact._id}>
                  {contact.name} {contact.surname}
                </option>
              ))
            ) : (
              <option disabled>No contacts available</option>
            )}
          </select>
        </div>

        {/* Client Selection */}
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-2">Select Client:</label>
          <select
            id="client"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Client</option>
            {clients.length > 0 ? (
              clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))
            ) : (
              <option disabled>No clients available</option>
            )}
          </select>
        </div>

        {/* Link Button */}
        <button
          onClick={handleLinkContact}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Link Contact
        </button>

        {/* Message */}
        {message && (
          <div className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkClient;
