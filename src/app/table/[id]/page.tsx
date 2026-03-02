export default async function TablePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  return (
    <div>
      <h1>Welcome to Table {id}</h1>

      <h3>Select option:</h3>

      <a href={`/order?table=${id}`}>Order</a><br/>
      <a href={`/payment?table=${id}`}>Payment</a><br/>
      <a href={`/review?table=${id}`}>Review</a>

    </div>
  )
}