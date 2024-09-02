import React, { useEffect, useState } from "react";
import { MongoClient } from "mongodb";

export default function ReviewStatusPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const client = new MongoClient("YOUR_MONGODB_URI", { useNewUrlParser: true, useUnifiedTopology: true });
      try {
        await client.connect();
        const database = client.db('your_database');
        const reviewsCollection = database.collection('reviews');
        const reviewsArray = await reviewsCollection.find({ author: "TEAM_MEMBER_ID" }).toArray(); // Replace with actual team member ID
        setReviews(reviewsArray);
      } finally {
        await client.close();
      }
    }
    fetchReviews();
  }, []);

  return (
    <div>
      {reviews.map((review) => (
        <div key={review._id}>
          <h3>{review.changes.name}</h3>
          <p>Status: {review.status}</p>
        </div>
      ))}
    </div>
  );
}
