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
    <div>
      <h1>Client Dashboard</h1>
      <div>
        <button onClick={() => setView('add')}>Add Client</button>
        <button onClick={() => setView('view')}>View Clients</button>
      </div>

      {view === 'add' && <AddClientForm onClientAdded={handleClientAdded} />}
      {view === 'view' && <ClientList />}
    </div>
  );
};

export default Page;
