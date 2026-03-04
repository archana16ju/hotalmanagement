'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function OrderPage() {
  const { id: tableId } = useParams()
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`/api/order/${tableId}`)
      const data = await res.json()
      setOrders(data || [])
    }
    fetchOrders()
  }, [tableId])

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Orders for Table {tableId}</h1>
      {orders.length ? (
        <ul>
          {orders.map((o, i) => (
            <li key={i}>
              {o.name} × {o.quantity} - ₹{o.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  )
}