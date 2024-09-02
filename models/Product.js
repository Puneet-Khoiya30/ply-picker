import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imagePath: { type: String, required: true }, // Path in Firebase Storage
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
