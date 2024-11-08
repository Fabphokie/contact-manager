"use client";
import { useState } from 'react';
import AddClientForm from './components/AddClientForm';
import ClientList from './components/ClientList';
import LinkClient from './components/LinkClient'; // Import LinkClient Component

const Page = () => {
  const [view, setView] = useState('view'); // 'add' or 'view'
  const [refresh, setRefresh] = useState(false); // Used to trigger refresh after adding a client
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const handleClientAdded = () => {
    setRefresh((prev) => !prev); // Trigger refresh by toggling the state
    setView('view'); // Switch back to the view clients list
  };

  const handleError = (errorMessage) => {
    setError(errorMessage); // Set error message
    setLoading(false); // Stop loading
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
          aria-label="Add Client"
        >
          Add Client
        </button>
        <button
          onClick={() => setView('view')}
          className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 transform ${
            view === 'view' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-600'
          } hover:bg-blue-500 hover:text-white`}
          aria-label="View Clients"
        >
          View Clients
        </button>
        <button
          onClick={() => setView('link')}
          className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 transform ${
            view === 'link' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-600'
          } hover:bg-blue-500 hover:text-white`}
          aria-label="Link Client"
        >
          Link Client
        </button>
      </div>

      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 md:p-8">
        {loading && <div>Loading...</div>} {/* Show loading state */}
        {error && <div className="text-red-600">{error}</div>} {/* Show error message */}

        {view === 'add' && <AddClientForm onClientAdded={handleClientAdded} onError={handleError} />}
        {view === 'view' && <ClientList refresh={refresh} onError={handleError} />}
        {view === 'link' && <LinkClient onError={handleError} />} {/* Conditionally render LinkClient */}
      </div>
    </div>
  );
};

export default Page;
