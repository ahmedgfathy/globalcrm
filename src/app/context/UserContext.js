"use client";
import { createContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "../components/Loader/Loader";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [state, setState] = useState({
    userData: {},
  });
  const [isStateInitialized, setIsStateInitialized] = useState(false);

  const getState = () => {
    const storedAuth = window.localStorage.getItem("session");
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        if (parsedAuth) {
          setState(parsedAuth);
        } else {
          console.warn("Access token missing in auth data");
          localStorage.removeItem("session");
        }
      } catch (error) {
        console.error("Error parsing auth data from localStorage", error);
      }
    }
    setIsStateInitialized(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getState();
    }
  }, []);

  useEffect(() => {
    if (!isStateInitialized) return;

    const excludedPaths = ["login", "test"];
    const isExcludedPath = excludedPaths.some((excludedPath) =>
      pathName.includes(excludedPath)
    );
    console.log(state)
    if (!state?.userData?.userId && !isExcludedPath) {
      router.push("/login");
    }
  }, [state, pathName, isStateInitialized]);

  return isStateInitialized ? (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  ) : (
    <Loader />
  );
};

export { UserContext, UserProvider };
