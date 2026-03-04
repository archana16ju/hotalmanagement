'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface QRSettingsType {
  qrOptions: {
    enableOrder: boolean;
    enablePayment: boolean;
    enableReview: boolean;
  };
}

export default function TableHubPage() {
  const { id: tableId } = useParams();
  const router = useRouter();
  const [qrSettings, setQRSettings] = useState<QRSettingsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/qr-settings')
      .then(res => res.json())
      .then(data => setQRSettings(data?.docs?.[0] || null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading table...</p>;
  if (!qrSettings) return <p style={{ textAlign: 'center' }}>No QR settings found.</p>;

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: 30 }}>Welcome to Table {tableId}</h2>
      <div className="card-container">
        {qrSettings.qrOptions.enableOrder && (
          <div className="card" onClick={() => router.push(`/order/${tableId}`)}>
            <img src="/assets/order.png" alt="Order" />
            <p>Order</p>
          </div>
        )}
        {qrSettings.qrOptions.enablePayment && (
          <div className="card" onClick={() => router.push(`/payment/${tableId}`)}>
            <img src="/assets/payment.png" alt="Payment" />
            <p>Payment</p>
          </div>
        )}
        {qrSettings.qrOptions.enableReview && (
          <div className="card" onClick={() => router.push(`/review/${tableId}`)}>
            <img src="/assets/review.png" alt="Review" />
            <p>Review</p>
          </div>
        )}
      </div>
    </div>
  );
}