import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute () {
    const { user, isLoading } = useAuth();

    //check first is user is logged in - if so, do nothing
    if (isLoading) {
        return null;
    }

    //if user is not logged in, then redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />
}