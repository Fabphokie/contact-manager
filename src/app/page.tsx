"use client";
import { useState } from 'react';
import AddClientForm from './components/AddClientForm';
import ClientList from './components/ClientList';

const Page = () => {
  const [view, setView] = useState('view'); // 'add' or 'view'
  const [refresh, setRefresh] = useState(false); // Used to trigger refresh after adding a client

  const handleClientAdded = () => {
    setRefresh((prev) => !prev); // Trigger refresh by toggling the state
    setView('view'); // Switch back to the view clients list
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Client Dashboard</h1>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setView('add')}
          className={`px-4 py-2 rounded-md font-semibold ${
            view === 'add' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-600'
          } hover:bg-blue-500 hover:text-white transition`}
        >
          Add Client
        </button>
        <button
          onClick={() => setView('view')}
          className={`px-4 py-2 rounded-md font-semibold ${
            view === 'view' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-600'
          } hover:bg-blue-500 hover:text-white transition`}
        >
          View Clients
        </button>
      </div>

      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        {view === 'add' && <AddClientForm onClientAdded={handleClientAdded} />}
        {view === 'view' && <ClientList refresh={refresh} />}
      </div>
    </div>
  );
};

export default Page;
