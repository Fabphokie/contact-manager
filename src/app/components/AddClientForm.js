// src/app/components/AddClientForm.js
"use client"

import { useState } from 'react';

const AddClientForm = () => {
  const [clientName, setClientName] = useState('');
  const [clientContactPerson, setClientContactPerson] = useState('');
  const [clientContactEmail, setClientContactEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientData = {
      name: clientName,
      contactPerson: clientContactPerson,
      contactEmail: clientContactEmail,
      phone: clientPhone,
      address: clientAddress,
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
      setClientContactPerson('');
      setClientContactEmail('');
      setClientPhone('');
      setClientAddress('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Client Name:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact Person:</label>
          <input
            type="text"
            value={clientContactPerson}
            onChange={(e) => setClientContactPerson(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact Email:</label>
          <input
            type="email"
            value={clientContactEmail}
            onChange={(e) => setClientContactEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Client</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default AddClientForm;
