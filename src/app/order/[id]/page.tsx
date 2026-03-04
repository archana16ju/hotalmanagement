'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderPage() {
  const { id: tableId } = useParams();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/order/${tableId}`)
      .then(res => res.json())
      .then(data => setOrders(data.orders || []))
      .finally(() => setLoading(false));
  }, [tableId]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 50 }}>Loading orders...</p>;

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Orders for Table {tableId}</h1>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((order, idx) => (
        <div key={idx} className="order-item">
          <p>{order.itemName}</p>
          <p>Qty: {order.quantity}</p>
        </div>
      ))}
    </div>
  );
}