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

  if (!payment) return <p style={{ textAlign: 'center', marginTop: 50 }}>Loading payment info...</p>;

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Payment for Table {tableId}</h1>
      <p>Total Amount: ₹{payment.totalAmount}</p>
      <p>Status: {payment.status}</p>
    </div>
  );
}