export default function TablePage({ params }: { params: { id: string } }) {

  const tableId = params.id

  const displayName =
    tableId.replace(/-/g, ' ').toUpperCase()

  return (
    <div>

      <h1>Welcome to {displayName}</h1>

      <a href={`/order?table=${tableId}`}>Order</a><br/>
      <a href={`/payment?table=${tableId}`}>Payment</a><br/>
      <a href={`/review?table=${tableId}`}>Review</a>

    </div>
  )
}