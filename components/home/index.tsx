"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Homepage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the sign-in page immediately on page load
    router.push("/sign-in");
  }, [router]);

  return null;
};

export default Homepage;
