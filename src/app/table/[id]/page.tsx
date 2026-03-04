'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function QRPage() {
  const { id: tableId } = useParams();
  const [search, setSearch] = useState('');

  return (
    <div className="app-container">

      <div className="sidebar">
        <h2>Welcome</h2>
        <button>Login</button>
        <button>Cart</button>
      </div>

      <div className="main-content">

        <div className="topbar">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>Table ID: {tableId}</div>
        </div>
        <div>
          <h3>Search Results for "{search}"</h3>
          <p>You can render menu items or orders here based on search.</p>
        </div>
      </div>
    </div>
  );
}