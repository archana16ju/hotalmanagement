'use client'

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

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Welcome {tableName}!</h1>
      <h2>Table ID: {id}</h2>
    </div>
  )
}