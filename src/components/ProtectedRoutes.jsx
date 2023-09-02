import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/auth/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) return navigate("/login");
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-colorBrand10">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return <Outlet />;
};
export default ProtectedRoutes;
