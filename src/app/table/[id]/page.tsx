'use client'

import { useSearchParams } from 'next/navigation'

interface TablePageProps {
  params: {
    id: string
  }
}

export default function TablePage({ params }: TablePageProps) {
  const { id } = params
  const searchParams = useSearchParams()

  const enableOrder = searchParams.get('order') === '1'
  const enablePayment = searchParams.get('payment') === '1'
  const enableReview = searchParams.get('review') === '1'

  const formattedTableName = id.replace(/-/g, ' ').toUpperCase()

  return (
    <div style={{ padding: 40, textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Welcome to {formattedTableName}</h1>

      <div style={{ marginTop: 40 }}>

        {enableOrder && (
          <button
            onClick={() => window.location.href = `/order/${id}`}
            style={{ padding: '12px 25px', margin: 10 }}
          >
            Order
          </button>
        )}

        {enablePayment && (
          <a
            href={`upi://pay?pa=hotel@upi&pn=HotelName&am=0&tn=${id}`}
            style={{
              padding: '12px 25px',
              margin: 10,
              display: 'inline-block'
            }}
          >
            Payment
          </a>
        )}

        {enableReview && (
          <button
            onClick={() => window.location.href = `/review/${id}`}
            style={{ padding: '12px 25px', margin: 10 }}
          >
            Review
          </button>
        )}

      </div>
    </div>
  )
}