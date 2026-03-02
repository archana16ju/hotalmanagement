export default function TablePage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div style={{ padding: 40 }}>
      <h1>✅ QR Working</h1>
      <h2>Table ID: {params.id}</h2>
      <p>This is only for QR testing.</p>
    </div>
  )
}