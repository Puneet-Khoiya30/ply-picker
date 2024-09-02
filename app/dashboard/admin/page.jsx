// app/dashboard/admin/page.jsx
"use client"; // Mark this file as a Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import LogoutButton from '@/components/LogoutButton';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
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
          if (data.role === 'admin') {
            setUser(data); // Set user state with data
          } else {
            router.push('/unauthorized'); // Redirect non-admins
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

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      {/* <LogoutButton /> */}
    </div>
  );
}
