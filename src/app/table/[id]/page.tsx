export default function TablePage({ params }: { params: { id: string } }) {
  const { id } = params
  const enableOrder = true
  const enablePayment = true
  const enableReview = true

  return (
    <div style={{ padding: 40 }}>
      <h1>✅ QR Working</h1>
      <h2>Table ID: {id}</h2>

      {enableOrder && <button>Place Order</button>}
      {enablePayment && <button>Pay Now</button>}
      {enableReview && <button>Leave Review</button>}
    </div>
  )
}