'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ReviewPage() {
  const { id: tableId } = useParams();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    await fetch(`/api/review/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tableId, rating, feedback }),
    });
    setSubmitted(true);
  };

  if (submitted) return <p style={{ textAlign: 'center', marginTop: 50 }}>Thank you for your feedback!</p>;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Review Table {tableId}</h1>
      <label>Rating:</label>
      <select value={rating} onChange={e => setRating(Number(e.target.value))}>
        <option value={0}>Select</option>
        <option value={1}>1 ⭐</option>
        <option value={2}>2 ⭐</option>
        <option value={3}>3 ⭐</option>
        <option value={4}>4 ⭐</option>
        <option value={5}>5 ⭐</option>
      </select>

      <label>Feedback:</label>
      <textarea value={feedback} onChange={e => setFeedback(e.target.value)} />

      <button className="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}