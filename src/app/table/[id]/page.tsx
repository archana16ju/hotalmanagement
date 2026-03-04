'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TablePage() {
  const { id: tableId } = useParams();
  const router = useRouter();
  const [table, setTable] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/tables/${tableId}`)
      .then(res => res.json())
      .then(setTable);
  }, [tableId]);

  if (!table) return <p>Loading table info...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to Table {table.name}</h1>
      <div className="flex flex-col gap-4">
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => router.push(`/order/${tableId}`)}
        >
          Order
        </button>
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={() => router.push(`/payment/${tableId}`)}
        >
          Payment
        </button>
        <button
          className="bg-yellow-500 text-black p-2 rounded"
          onClick={() => router.push(`/review/${tableId}`)}
        >
          Review
        </button>
      </div>
    </div>
  );
}