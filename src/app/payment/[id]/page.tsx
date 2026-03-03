'use client'

import { useState } from 'react'

interface PaymentPageProps {
  params: { id: string }
}

export default function PaymentPage({ params }: PaymentPageProps) {
  const { id } = params

  const [amount, setAmount] = useState('')
  const [paymentLink, setPaymentLink] = useState('')

  const generatePayment = () => {
    if (!amount) {
      alert('Enter amount')
      return
    }

    const upiLink = `upi://pay?pa=hotel@upi&pn=HotelName&am=${amount}&tn=Payment for ${id}`
    setPaymentLink(upiLink)
  }

  return (
    <div style={containerStyle}>
      <h1>Payment</h1>
      <h2 style={{ marginBottom: 30 }}>Table: {id}</h2>

      <div style={{ width: 300 }}>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />

        <button onClick={generatePayment} style={buttonStyle}>
          Generate Payment
        </button>

        {paymentLink && (
          <div style={{ marginTop: 20 }}>
            <p>Click below to pay:</p>
            <a href={paymentLink} style={linkStyle}>
              Pay Now
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

const containerStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f4f4f4',
  padding: 20,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 10,
  fontSize: 16,
  marginBottom: 15,
  borderRadius: 6,
  border: '1px solid #ccc',
}

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: 12,
  fontSize: 16,
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
}

const linkStyle: React.CSSProperties = {
  display: 'inline-block',
  marginTop: 10,
  padding: 10,
  backgroundColor: '#28a745',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: 6,
}