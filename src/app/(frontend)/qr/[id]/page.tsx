
'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function QRRedirectPage() {
  const { id: tableId } = useParams();
  const router = useRouter();

  useEffect(() => {
    router.replace(`/table/${tableId}`);
  }, [router, tableId]);

  return <p>Redirecting to Table {tableId}...</p>;
}