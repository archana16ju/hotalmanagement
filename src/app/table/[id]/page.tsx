'use client'

import { useRouter, useParams } from 'next/navigation'
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/qr-settings`)
        const data = await res.json()
        setQRSettings(data?.docs?.[0] || null)
      } catch (error) {
        console.error('Failed to fetch QR settings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchQRSettings()
  }, [])

  if (loading) return <p style={{ textAlign: 'center', marginTop: 50 }}>Loading table...</p>
  if (!qrSettings) return <p style={{ textAlign: 'center', marginTop: 50 }}>No QR settings found.</p>

  return (
    <div style={{ padding: 20, textAlign: 'center', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: 28, marginBottom: 40 }}>Welcome to Table {tableId}</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 30 }}>
        {qrSettings.qrOptions.enableOrder && (
          <div onClick={() => router.push(`/order/${tableId}`)} style={cardStyle}>
            <img src="/assets/order.png" alt="Order" style={iconStyle} />
            <p style={{ margin: 0, fontWeight: 500 }}>Order</p>
          </div>
        )}
        {qrSettings.qrOptions.enablePayment && (
          <div onClick={() => router.push(`/payment/${tableId}`)} style={cardStyle}>
            <img src="/assets/payment.png" alt="Payment" style={iconStyle} />
            <p style={{ margin: 0, fontWeight: 500 }}>Payment</p>
          </div>
        )}
        {qrSettings.qrOptions.enableReview && (
          <div onClick={() => router.push(`/review/${tableId}`)} style={cardStyle}>
            <img src="/assets/review.png" alt="Review" style={iconStyle} />
            <p style={{ margin: 0, fontWeight: 500 }}>Review</p>
          </div>
        )}
      </div>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  width: 120,
  height: 120,
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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