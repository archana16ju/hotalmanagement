'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function OrderPage() {
  const { id: tableId } = useParams()
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/order/${tableId}`)
      .then(res => res.json())
      .then(data => setOrder(data?.docs?.[0]))
  }, [tableId])

  if (!order) return <p>Loading order...</p>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Orders for Table {tableId}</h1>
      {order.items?.map((item: any, idx: number) => (
        <div key={idx}>
          {item.name} x {item.quantity} - ₹{item.price}
        </div>
      ))}
      <p className="mt-4 font-bold">Total: ₹{order.total}</p>
    </div>
  )
}