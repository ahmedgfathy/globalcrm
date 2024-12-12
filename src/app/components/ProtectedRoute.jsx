import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { Spin } from "antd";
import { getSession } from "@/actions/auth";
import Unauthorized from "@/app/components/Unauthorized";

function ProtectedRoute({ children }) {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getSession(); // Make sure getSession is async
        if (!session) {
          setIsAuthorized(false);
        } else {
          setState({ userData: session.userData });
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, setState]); // Added setState as dependency

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" /> {/* Show the spinner while checking authentication status */}
      </div>
    );
  }

  if (!isAuthorized) {
    return <Unauthorized />; // Show the Unauthorized page if not authenticated
  }

  return <>{children}</>;
}

export default ProtectedRoute;