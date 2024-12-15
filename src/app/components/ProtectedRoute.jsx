import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { Spin } from "antd"; // Import the Spin component from Ant Design
import { getSession } from "@/actions/auth"; // Import the getSession function
import Unauthorized from "@/app/components/Unauthorized"; // Import the Unauthorized component

function ProtectedRoute({ children }) {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = getSession(); // Get session from cookies
      if (!session) {
        setIsAuthorized(false);
        setLoading(false);
      } else {
        setState({ userData: session.userData });
        setIsAuthorized(true);
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, setState]);

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