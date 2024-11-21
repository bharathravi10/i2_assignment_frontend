"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";


const LoginGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isInitialized } = useSelector((state:any) => state.auth);
  useEffect(() => {
    if (isAuthenticated && isInitialized) {
      router.back()
    }
  }, [isAuthenticated, router, pathname, isInitialized]);

  return children;
};

export default LoginGuard;
