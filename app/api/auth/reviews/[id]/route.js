import connectToDatabase from '@/lib/mongodb';
import Review from '@/models/Review';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await connectToDatabase();
  const review = await Review.findById(params.id);
  return NextResponse.json(review);
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  const updates = await request.json();
  const review = await Review.findByIdAndUpdate(params.id, updates, { new: true });
  return NextResponse.json(review);
}
