import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  changes: {
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
  },
  status: { type: String, enum: ['pending', 'rejected', 'approved'], default: 'pending' },
  author: { type: String, required: true }, // Replace with actual user ID
  adminId: { type: String }, // Admin who reviewed it
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
