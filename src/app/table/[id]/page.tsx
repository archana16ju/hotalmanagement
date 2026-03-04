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
    <div>
      <h1>Welcome to Table {tableId}</h1>
      <button onClick={() => router.push(`/order/${tableId}`)}>Order</button>
      <button onClick={() => router.push(`/payment/${tableId}`)}>Payment</button>
      <button onClick={() => router.push(`/review/${tableId}`)}>Review</button>
    </div>
  );
}