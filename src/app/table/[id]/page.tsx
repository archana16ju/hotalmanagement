'use client'

import React from 'react'

interface TablePageProps {
  params: { id: string }
}

export default function TablePage({ params }: TablePageProps) {
  const { id } = params
  const tableName = id
    .split('-')
    .map((word) =>
      word.toLowerCase() === 'ac'
        ? 'AC'
        : word.toLowerCase() === 'non'
        ? 'Non'
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ')
  const enableOrder = true
  const enablePayment = true
  const enableReview = true

  return (
    <div
      style={{
        padding: 40,
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>Welcome {tableName}!</h1>
      <h2 style={{ marginBottom: 20 }}>Table ID: {id}</h2>
      <p style={{ marginBottom: 30 }}>This is your table page. Scan the QR code to access this page.</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 15 }}>
        {enableOrder && (
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
            }}
          >
            Place Order
          </button>
        )}

        {enablePayment && (
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffc107',
              color: '#000',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
            }}
          >
            Pay Now
          </button>
        )}

        {enableReview && (
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
            }}
          >
            Leave Review
          </button>
        )}
      </div>
    </div>
  )
}