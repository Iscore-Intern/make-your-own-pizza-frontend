import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    allowedRoles?: number[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const token = localStorage.getItem('token');
    const userRoleStr = localStorage.getItem('role');
    const userRole = userRoleStr !== null ? Number(userRoleStr) : null;
    if (!token) {
        return <Navigate to="/" replace />;
    }
    if (allowedRoles && (userRole === null || !allowedRoles.includes(userRole))) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet />;
}