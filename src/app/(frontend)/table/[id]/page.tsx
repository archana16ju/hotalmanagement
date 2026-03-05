
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TableData {
  name: string;
  status: string;
  qrCodeUrl?: string;
}

export default function TablePage() {
  const { id: tableId } = useParams();
  const [table, setTable] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payload/collections/tables?where[name]=${tableId}`
        );
        const data = await res.json();
        if (data?.docs?.length > 0) setTable(data.docs[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTable();
  }, [tableId]);

  if (loading) return <div>Loading table...</div>;
  if (!table) return <div>Table not found</div>;

  return (
    <div className="table-page">
      <h1>Welcome to {table.name}</h1>
      <p>Status: {table.status}</p>
      {table.qrCodeUrl && <img src={table.qrCodeUrl} alt="Table QR Code" />}
      <div style={{ marginTop: '20px' }}>
        <button>View Menu</button>
        <button>Order Now</button>
        <button>Payment</button>
      </div>
    </div>
  );
}