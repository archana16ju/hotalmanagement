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

  if (submitted) return <p>Thank you for your feedback!</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Review Table {tableId}</h1>
      <div className="mb-4">
        <label>Rating: </label>
        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
          <option value={0}>Select</option>
          <option value={1}>1 ⭐</option>
          <option value={2}>2 ⭐</option>
          <option value={3}>3 ⭐</option>
          <option value={4}>4 ⭐</option>
          <option value={5}>5 ⭐</option>
        </select>
      </div>
      <div className="mb-4">
        <label>Feedback:</label>
        <textarea
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}