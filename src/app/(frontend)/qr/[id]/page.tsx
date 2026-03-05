'use client';

import { useEffect, useState } from 'react';

export default function TableList() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetch('/api/collections/tables')
      .then((res) => res.json())
      .then((data) => setTables(data.docs || []));
  }, []);

  return (
    <ul>
      {tables.map((table: any) => (
        <li key={table.id}>{table.name}</li>  
      ))}
    </ul>
  );
}