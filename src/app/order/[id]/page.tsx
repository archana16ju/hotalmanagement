'use client'

import { useEffect, useState } from 'react'

interface Order {
  id: string
  table: string
  items: { name: string; qty: number }[]
}

export default function OrderPage({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/orders?table=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.length > 0) {
          setOrder(data[0])
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const createOrder = async () => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: id, items: [] }),
    })

    const newOrder = await res.json()
    setOrder(newOrder)
  }

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Place Order for {id.replace(/-/g, ' ')}</h1>

      {order ? (
        <p>Order exists! You can add items to it here.</p>
      ) : (
        <button
          onClick={createOrder}
          style={{ padding: '10px 20px', marginTop: 20 }}
        >
          Create Order
        </button>
      )}
    </div>
  )
}