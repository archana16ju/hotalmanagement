'use client'

import { useState } from 'react'

interface ReviewPageProps {
  params: { id: string }
}
export default function ReviewPage({ params }: ReviewPageProps) {
  const { id } = params
  const [review, setReview] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submitReview = async () => {
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: id, text: review }),
    })
    setSubmitted(true)
  }
  if (submitted) return <p>Thank you for your review!</p>
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Leave Review for {id.replace(/-/g, ' ')}</h1>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={5}
        cols={40}
        placeholder="Write your review here..."
        style={{ marginTop: 20 }}
      />
      <br />
      <button onClick={submitReview} style={{ padding: '10px 20px', marginTop: 10 }}>
        Submit Review
      </button>
    </div>
  )
}