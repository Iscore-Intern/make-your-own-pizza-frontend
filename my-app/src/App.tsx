import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthenticationPage from './Features/Authentication/Authentication.page';
import ProtectedRoute from './Core/ProtectedRoute';
import MyOrdersPage from './features/MyOrders/MyOrders.page';
import ProfilePage from './features/Profile/Profile.Page';
import MyCartPage from './features/Cart/Cart.page';
import OrderDetailsPage from './features/OrderDetails/OrderDetails.page';
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/singleOrder" element={<OrderDetailsPage />} />
                <Route path="/orders" element={<MyOrdersPage />} />
                <Route path="/" element={<AuthenticationPage />} />
                <Route path="/orders" element={<MyOrdersPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<MyCartPage />} />

                <Route element={<ProtectedRoute />}>
                    
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}