import connectToDatabase from '@/lib/mongodb';
import Review from '@/models/Review';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectToDatabase();
  const data = await request.json();
  const review = new Review(data);
  await review.save();
  return NextResponse.json(review);
}
