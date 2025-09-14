'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Ensure this only runs after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid mismatch during SSR

  // Don't show Navbar on root route
  if (pathname === '/') return null;

  return <Navbar />;
}
