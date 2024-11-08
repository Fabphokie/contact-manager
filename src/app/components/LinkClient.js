import { useState, useEffect } from 'react';

const LinkClient = () => {
  const [contacts, setContacts] = useState([]);
  const [clients, setClients] = useState([]);  // Ensure clients is initialized as an empty array
  const [selectedContact, setSelectedContact] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch both clients and contacts from the API
    const fetchContactsAndClients = async () => {
      try {
        const response = await fetch('/api/contacts');
        
        // Check if the response is OK
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        // To Check if the response body is empty
        const data = await response.text(); 
        if (!data) {
          throw new Error('Empty response body');
        }

        const jsonData = JSON.parse(data);
        console.log('Fetched JSON Data:', jsonData);  // Log the entire data response
        
        setClients(jsonData.clients || []);  // Default to an empty array if no clients data
        setContacts(jsonData.contacts || []);  // Default to an empty array if no contacts data

      } catch (error) {
        setMessage(`Error fetching data: ${error.message}`);
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
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Link Contact to Client</h2>

      <div className="space-y-2">
        <label htmlFor="contact" className="block text-lg font-semibold text-gray-700">Select Contact</label>
        <select
          id="contact"
          value={selectedContact}
          onChange={(e) => setSelectedContact(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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

      <div className="space-y-2">
        <label htmlFor="client" className="block text-lg font-semibold text-gray-700">Select Client</label>
        <select
          id="client"
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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

      <div className="flex justify-center">
        <button
          onClick={handleLinkContact}
          className="w-full md:w-1/2 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Link Contact
        </button>
      </div>

      {message && (
        <div className="text-center mt-4 text-lg font-medium text-gray-800">
          {message}
        </div>
      )}
    </div>
  );
};

export default LinkClient;
