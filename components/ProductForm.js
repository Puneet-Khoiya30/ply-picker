import { useState } from 'react';
import CropImageModal from './CropImageModal';

const ProductForm = ({ product }) => {
  const [formData, setFormData] = useState(product);
  const [image, setImage] = useState(product.imageUrl);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary URL for the uploaded image to preview
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setIsCropModalOpen(true); // Open the crop modal
    }
  };

  const handleImageCropped = (croppedImage) => {
    setImage(croppedImage); // Set the cropped image URL
    setFormData({ ...formData, imageUrl: croppedImage }); // Update formData with the cropped image URL
    setIsCropModalOpen(false); // Close the crop modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit product changes for review
    const res = await fetch(`/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, productId: product._id })
    });
    if (res.ok) {
      alert('Changes submitted for review');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Product Name"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Product Description"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        placeholder="Product Price"
      />
      <div>
        <img src={image} alt="Product Preview" style={{ maxWidth: '100px', marginBottom: '10px' }} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <button type="submit">Submit for Review</button>

      {isCropModalOpen && (
        <CropImageModal
          imageUrl={image}
          onCrop={handleImageCropped}
          onClose={() => setIsCropModalOpen(false)}
        />
      )}
    </form>
  );
};

export default ProductForm;
