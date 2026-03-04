'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface QRSettingsType {
  qrOptions: {
    enableOrder: boolean
    enablePayment: boolean
    enableReview: boolean
  }
}

export default function TableHubPage() {
  const { id: tableId } = useParams()
  const router = useRouter()
  const [qrSettings, setQRSettings] = useState<QRSettingsType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQRSettings = async () => {
      try {
        const res = await fetch('/api/qr-settings')
        if (!res.ok) throw new Error('Failed to fetch QR settings')
        const data = await res.json()

        // Assuming you have only one QRSettings config
        setQRSettings(data?.docs?.[0] || null)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchQRSettings()
  }, [])

  if (loading) return <p>Loading table...</p>
  if (!qrSettings) return <p>No QR settings found. Please check admin.</p>

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to Table {tableId}</h1>
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        {qrSettings.qrOptions.enableOrder && (
          <button
            style={buttonStyle}
            onClick={() => router.push(`/order/${tableId}`)}
          >
            Order
          </button>
        )}
        {qrSettings.qrOptions.enablePayment && (
          <button
            style={buttonStyle}
            onClick={() => router.push(`/payment/${tableId}`)}
          >
            Payment
          </button>
        )}
        {qrSettings.qrOptions.enableReview && (
          <button
            style={buttonStyle}
            onClick={() => router.push(`/review/${tableId}`)}
          >
            Review
          </button>
        )}
      </div>
    </div>
  )
}

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: 5,
}