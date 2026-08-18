import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthenticationPage from './features/authentication/Authentication.page';
import ProtectedRoute from './Core/ProtectedRoute';
import MyOrdersPage from './features/MyOrders/MyOrders.page';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthenticationPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/orders" element={<MyOrdersPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}