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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">Client Dashboard</h1>
      
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setView('add')}
          className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 transform ${
            view === 'add' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-600'
          } hover:bg-blue-500 hover:text-white`}
        >
          Add Client
        </button>
        <button
          onClick={() => setView('view')}
          className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 transform ${
            view === 'view' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-600'
          } hover:bg-blue-500 hover:text-white`}
        >
          View Clients
        </button>
      </div>

      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 md:p-8">
        {view === 'add' && <AddClientForm onClientAdded={handleClientAdded} />}
        {view === 'view' && <ClientList refresh={refresh} />}
      </div>
    </div>
  );
};

export default Page;
