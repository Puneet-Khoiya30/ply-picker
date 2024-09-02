import ProductForm from '@/components/ProductForm';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProductDetailPage = () => {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Fetch product details
      async function fetchProduct() {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      }

      fetchProduct();
    }
  }, [id]);

  return (
    <div>
      <h1>Edit Product</h1>
      {product ? <ProductForm product={product} /> : 'Loading...'}
    </div>
  );
};

export default ProductDetailPage;
