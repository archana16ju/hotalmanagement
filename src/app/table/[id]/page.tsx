'use client'

import Link from 'next/link'

interface TablePageProps {
  params: { id: string }
}

export default function TablePage({ params }: TablePageProps) {
  const { id } = params

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f4f4f4',
      padding: 20
    }}>
     <h1 style={{ marginBottom: 10 }}>WELCOME UPDATED</h1>
      <h2 style={{ marginBottom: 30 }}>{id}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 15, width: 250 }}>
        
        <Link href={`/order/${id}`}>
          <button style={buttonStyle}>Order Food</button>
        </Link>

        <Link href={`/payment/${id}`}>
          <button style={buttonStyle}>Make Payment</button>
        </Link>

        <Link href={`/review/${id}`}>
          <button style={buttonStyle}>Leave Review</button>
        </Link>

      </div>
    </div>
  )
}

const buttonStyle: React.CSSProperties = {
  padding: '12px',
  fontSize: '16px',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
}