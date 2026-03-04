'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentPage() {
  const { id: tableId } = useParams();
  const [payment, setPayment] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/payment/${tableId}`)
      .then(res => res.json())
      .then(setPayment);
  }, [tableId]);

  if (!payment) return <p style={{ textAlign: 'center' }}>Loading payment...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Payment for Table {tableId}</h2>
      <p>Total Amount: ₹{payment.totalAmount}</p>
      <p>Status: {payment.status}</p>
      <button className="button">Pay Now</button>
    </div>
  );
}