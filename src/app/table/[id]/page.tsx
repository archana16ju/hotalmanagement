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

  if (loading) return <p style={{ textAlign: 'center', marginTop: 50 }}>Loading table...</p>;
  if (!qrSettings) return <p style={{ textAlign: 'center', marginTop: 50 }}>No QR settings found.</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '40px' }}>Welcome to Table {tableId}</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
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

const cardStyle: React.CSSProperties = {
  width: 200,
  height: 200,
  borderRadius: 12,
  boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: '#fff',
  padding: 10,
}

const iconStyle: React.CSSProperties = {
  width: 50,
  height: 50,
  marginBottom: 10,
}