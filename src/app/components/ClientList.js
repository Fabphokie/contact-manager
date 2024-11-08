import { useState, useEffect } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contacts'); // Ensure this path matches your API route
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        setContacts(data.contacts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div className="text-center py-4 text-xl">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500 text-xl">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Contact List</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Surname</th>
            <th className="px-6 py-3 text-left">Email Address</th>
            <th className="px-6 py-3 text-left">Client Code</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id?.$oid || contact.clientCode || contact.name} className="hover:bg-gray-100">
              <td className="px-6 py-4 border-t">{contact.name}</td>
              <td className="px-6 py-4 border-t">{contact.surname}</td>
              <td className="px-6 py-4 border-t">{contact.contactEmail}</td>
              <td className="px-6 py-4 border-t">{contact.clientCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
