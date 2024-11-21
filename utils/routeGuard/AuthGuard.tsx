'use client';
import { useRouter } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isInitialized } = useSelector((state:any) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated && isInitialized) {
      router.push('/sign-in')
    };

    // eslint-disable-next-line
  }, [isAuthenticated, isInitialized]);

  if (!isAuthenticated) return <NextTopLoader />;

  return children;
};

export default AuthGuard;