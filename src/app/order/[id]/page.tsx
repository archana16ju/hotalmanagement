'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderPage() {
  const { id: tableId } = useParams();
  const [orders, setOrders] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/order/${tableId}`)
      .then(res => res.json())
      .then(setOrders);
  }, [tableId]);

  if (!orders) return <p>Loading orders...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Orders for Table {tableId}</h1>
      <ul className="list-disc pl-5">
        {orders.map((o: any) => (
          <li key={o.id}>
            {o.items.map((item: any) => item.name).join(', ')} - Status: {o.status}
          </li>
        ))}
      </ul>
    </div>
  );
}