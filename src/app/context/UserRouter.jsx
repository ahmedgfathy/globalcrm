"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Loader from "../components/Loader/Loader";

function UserRouter({ children }) {
  const router = useRouter();
  const pathName = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [pathName, router]);

  return !isClient ? <Loader /> : <>{children}</>;
}

export default UserRouter;
