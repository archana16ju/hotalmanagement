'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderPage() {
  const { id: tableId } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/order/${tableId}`)
      .then(res => res.json())
      .then(setOrder);
  }, [tableId]);

  if (!order) return <p style={{ textAlign: 'center' }}>Loading order...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Order for Table {tableId}</h2>
      <ul>
        {order.items.map((item: any, i: number) => (
          <li key={i}>{item.name} - ₹{item.price}</li>
        ))}
      </ul>
      <p>Total: ₹{order.total}</p>
    </div>
  );
}