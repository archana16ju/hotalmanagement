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

  if (!payment) return <p>Loading payment info...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment for Table {tableId}</h1>
      <p>Total Amount: ₹{payment.totalAmount}</p>
      <p>Status: {payment.status}</p>
    </div>
  );
}