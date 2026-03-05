'use client';

import { useEffect, useState } from 'react';

interface Table {
  id: string;
  name: string;
}

export default function TableList() {
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    fetch('/api/collections/tables')
      .then((res) => res.json())
      .then((data) => setTables(data.docs || []));
  }, []);

  return (
    <ul>
      {tables.map((table) => (
        <li key={table.id}>{table.name}</li>
      ))}
    </ul>
  );
}