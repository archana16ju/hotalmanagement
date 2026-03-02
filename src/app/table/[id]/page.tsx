type Props = {
  params: { id: string }
  searchParams: {
    order?: string
    payment?: string
    review?: string
  }
}

export default function TablePage({ params, searchParams }: Props) {

  const tableId = params.id

  const orderEnabled = searchParams.order === '1'
  const paymentEnabled = searchParams.payment === '1'
  const reviewEnabled = searchParams.review === '1'

  return (
    <div style={{ padding: 20 }}>

      <h1>Welcome to Table {tableId}</h1>

      <h3>Select option:</h3>

      {orderEnabled && (
        <>
          <a href={`/order?table=${tableId}`}>Order</a>
          <br/>
        </>
      )}

      {paymentEnabled && (
        <>
          <a href={`/payment?table=${tableId}`}>Payment</a>
          <br/>
        </>
      )}

      {reviewEnabled && (
        <>
          <a href={`/review?table=${tableId}`}>Review</a>
        </>
      )}

    </div>
  )
}