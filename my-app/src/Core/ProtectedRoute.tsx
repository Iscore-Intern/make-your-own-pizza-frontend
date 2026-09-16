import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getAuthRole, getRoleDefaultPath } from './Utils/auth.utils';

interface ProtectedRouteProps {
    allowedRoles?: number[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const token = localStorage.getItem('token');
    const location = useLocation();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const userRole = getAuthRole();

        if (!allowedRoles.includes(userRole)) {
            const targetPath = getRoleDefaultPath(userRole);

            // Prevent infinite redirect loop if already on target path
            if (location.pathname === targetPath) {
                return <Outlet />;
            }

            return <Navigate to={targetPath} replace />;
        }
    }

    return <Outlet />;
}