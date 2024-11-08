import { useState, useEffect } from 'react';

const contactList = ({ refresh }) => {
  const [contacts, setcontacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchcontacts = async () => {
      try {
        const response = await fetch('/api/contacts'); // API endpoint to get contacts
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        setcontacts(data.contacts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchcontacts();
  }, [refresh]); // Dependency array listens to the `refresh` prop to trigger re-fetching

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>contact List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.contactPerson}</td>
              <td>{contact.contactEmail}</td>
              <td>{contact.phone}</td>
              <td>{contact.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default contactList;
