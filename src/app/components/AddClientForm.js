"use client";
import { useState } from 'react';

const AddClientForm = ({ onClientAdded }) => {
  const [clientName, setClientName] = useState('');
  const [clientSurname, setClientSurname] = useState('');
  const [clientContactEmail, setClientContactEmail] = useState('');
  const [clientCode, setClientCode] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientData = {
      name: clientName,
      surname: clientSurname,
      contactEmail: clientContactEmail,
      clientCode: clientCode,
    };

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        throw new Error('Failed to add client');
      }

      const data = await response.json();
      setSuccessMessage('Client added successfully!');
      setClientName('');
      setClientSurname('');
      setClientContactEmail('');
      setClientCode('');
      setError('');

      if (onClientAdded) onClientAdded(); // Trigger refresh in parent component
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Client</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">First Name:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Surname:</label>
          <input
            type="text"
            value={clientSurname}
            onChange={(e) => setClientSurname(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email Address:</label>
          <input
            type="email"
            value={clientContactEmail}
            onChange={(e) => setClientContactEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Client Code:</label>
          <input
            type="text"
            value={clientCode}
            onChange={(e) => setClientCode(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Add Client
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 text-center font-medium">Error: {error}</p>
      )}
      {successMessage && (
        <p className="mt-4 text-green-600 text-center font-medium">{successMessage}</p>
      )}
    </div>
  );
};

export default AddClientForm;
