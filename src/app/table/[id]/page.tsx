'use client'

interface TablePageProps {
  params: { slug: string }
}

export default function TablePage({ params }: TablePageProps) {
  const { slug } = params

  const tableName = slug
    .split('-')
    .map(word => {
      if (word.toLowerCase() === 'ac') return 'AC'
      if (word.toLowerCase() === 'non') return 'Non'
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')

  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const enableOrder = urlParams.get('order') === '1'
  const enablePayment = urlParams.get('payment') === '1'
  const enableReview = urlParams.get('review') === '1'


  const handleOrder = () => {
    window.location.href = `/order/${slug}` 
  }

  const handlePayment = () => {
    window.location.href = `upi://pay?pa=hotel@upi&pn=HotelName&am=0&tn=${slug}` // redirect to payment
  }

  const handleReview = () => {
    window.location.href = `/review/${slug}` 
  }

  return (
    <div style={{ padding: 40, textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>Welcome {tableName}!</h1>
      <h2 style={{ marginBottom: 20 }}>Table Slug: {slug}</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 15 }}>
        {enableOrder && (
          <button onClick={handleOrder} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
            Place Order
          </button>
        )}

        {enablePayment && (
          <button onClick={handlePayment} style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
            Pay Now
          </button>
        )}

        {enableReview && (
          <button onClick={handleReview} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
            Leave Review
          </button>
        )}
      </div>
    </div>
  )
}