import { Navigate, Outlet } from 'react-router-dom';
import { RoleEnum } from './Utils/auth.utils';

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
        if (userRole === RoleEnum.Manager) return <Navigate to="/dashboard" replace />;
        if (userRole === RoleEnum.Delivery) return <Navigate to="/delivery" replace />;
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}