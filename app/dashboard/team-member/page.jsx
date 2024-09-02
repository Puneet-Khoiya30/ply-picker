
// ___________________________________________________________________________________

// "use client"; // Mark this file as a Client Component

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function TeamMemberDashboard() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       try {
//         const res = await fetch('/api/auth/verifyToken', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ token }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           if (data.role === 'team-member') {
//             setUser(data); // Set user state with data
//           } else {
//             router.push('/'); // Redirect non-team-members
//           }
//         } else {
//           setError(data.error || 'Verification failed');
//           router.push('/login'); // Redirect to login on error
//         }
//       } catch (error) {
//         console.error('Failed to verify token:', error);
//         setError('An error occurred');
//         router.push('/login');
//       }
//     };

//     checkToken();
//   }, [router]);

//   if (error) return <div>{error}</div>;
//   if (!user) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Team Member Dashboard</h1>
//       <p>Welcome, Team Member!</p>
//     </div>
//   );
// }

//________________________________________________________________________________________________________




// app/dashboard/team-member/page.jsx
"use client"; // Add this directive at the top

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import ProductForm from '../../components/ProductForm';


export default function TeamMemberDashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('/api/auth/verifyToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok) {
          if (data.role === 'team-member') {
            setUser(data); // Set user state with data
          } else {
            router.push('/'); // Redirect non-team-members
          }
        } else {
          setError(data.error || 'Verification failed');
          router.push('/login'); // Redirect to login on error
        }
      } catch (error) {
        console.error('Failed to verify token:', error);
        setError('An error occurred');
        router.push('/login');
      }
    };

    checkToken();
  }, [router]);

  useEffect(() => {
    // Fetch products for team members to edit
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError('Team Member Dashboard');
      }
    }

    fetchProducts();
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Team Member Dashboard</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <ProductForm product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

