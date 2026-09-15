import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthenticationPage from './features/authentication/Authentication.page';
import ProtectedRoute from './Core/ProtectedRoute';
import MyOrdersPage from './features/MyOrders/MyOrders.page';
import ProfilePage from './features/Profile/Profile.Page';
import DeliveryHomePage from './features/Delivery/DeliveryHomepage.Page';
import DeliveryDetailsPage from './features/Delivery/DeliveryDetails.Page';
import OrderDetailsPage from './features/OrderDetails/OrderDetails.page';
import ManagerDashboard from './features/dashboard/ManagerDashboardPage';
import IngredientsManager from './features/Ingredients/Ingredients.Page';
import ManagerOrderDetailsPage from './features/ManagerViewOrder/ManagerOrderDetails.Page';
import HomePage from './features/Home/HomePage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/builder" element={<HomePage />} />
                <Route path="/delivery" element={<DeliveryHomePage />} />
                <Route path="/delivery/:orderId" element={<DeliveryDetailsPage />} />
                <Route path="/singleOrder" element={<OrderDetailsPage />} />
                <Route path="/orders" element={<MyOrdersPage />} />
                <Route path="/dashboard" element={<ManagerDashboard />} />
                <Route path="/viewOrder" element={<ManagerOrderDetailsPage />} />
                <Route path="/viewOrder/:orderId" element={<ManagerOrderDetailsPage />} />
                <Route path="/" element={<AuthenticationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/addIngredient" element={<IngredientsManager />} />

                <Route element={<ProtectedRoute />}>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}