import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await connectToDatabase();
  const product = await Product.findById(params.id);
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  const updates = await request.json();
  const product = await Product.findByIdAndUpdate(params.id, updates, { new: true });
  return NextResponse.json(product);
}
