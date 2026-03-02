export default function TablePage({ params }: { params: { id: string } }) {

  const tableId = params.id

  return (
    <div>
      <h1>Welcome to Table {tableId}</h1>

      <h3>Select option:</h3>
      
      <a href={`/order?table=${tableId}`}>Order</a><br/>
      <a href={`/payment?table=${tableId}`}>Payment</a><br/>
      <a href={`/review?table=${tableId}`}>Review</a>

    </div>
  )
}