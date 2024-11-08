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

  if (loading) return <div className="text-center text-gray-500 mt-4">Loading...</div>;
  if (error) return <div className="text-center text-red-600 font-medium mt-4">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact List</h2>
      <table className="table-auto w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="px-4 py-2 font-semibold">Name</th>
            <th className="px-4 py-2 font-semibold">Surname</th>
            <th className="px-4 py-2 font-semibold">Email Address</th>
            <th className="px-4 py-2 font-semibold">Client Code</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} className="odd:bg-white even:bg-gray-50">
              <td className="border px-4 py-2 text-gray-700">{contact.name}</td>
              <td className="border px-4 py-2 text-gray-700">{contact.surname}</td>
              <td className="border px-4 py-2 text-gray-700">{contact.email}</td>
              <td className="border px-4 py-2 text-gray-700">{contact.clientCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
