import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthenticationPage from './features/authentication/Authentication.page';
import ProtectedRoute from './Core/ProtectedRoute';
import AppLayout from './Shared/Components/Layout/AppLayout';
import MyOrdersPage from './features/MyOrders/MyOrders.page';
import ProfilePage from './features/Profile/Profile.Page';
import DeliveryHomePage from './features/Delivery/DeliveryHomepage.Page';
import DeliveryDetailsPage from './features/Delivery/DeliveryDetails.Page';
import OrderDetailsPage from './features/OrderDetails/OrderDetails.page';
import ManagerDashboard from './features/dashboard/ManagerDashboardPage';
import IngredientsManager from './features/Ingredients/Ingredients.Page';
import ManagerOrderDetailsPage from './features/ManagerViewOrder/ManagerOrderDetails.Page';
import HomePage from './features/Home/HomePage';
import CartPage from './features/Cart/Cart.page';
import CheckoutPage from './features/Checkout/Checkout.page';
import { RoleEnum } from './Core/Utils/auth.utils';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Authentication Route */}
                <Route path="/" element={<AuthenticationPage />} />

                {/* Authenticated Layout with Unified AppNavbar */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        {/* Common to all authenticated roles */}
                        <Route path="/profile" element={<ProfilePage />} />

                        {/* Customer-Only Routes (Role 2) */}
                        <Route element={<ProtectedRoute allowedRoles={[RoleEnum.Customer]} />}>
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/builder" element={<HomePage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/orders" element={<MyOrdersPage />} />
                            <Route path="/singleOrder" element={<OrderDetailsPage />} />
                            <Route path="/singleOrder/:id" element={<OrderDetailsPage />} />
                        </Route>

                        {/* Manager-Only Routes (Role 0) */}
                        <Route element={<ProtectedRoute allowedRoles={[RoleEnum.Manager]} />}>
                            <Route path="/dashboard" element={<ManagerDashboard />} />
                            <Route path="/viewOrder" element={<ManagerOrderDetailsPage />} />
                            <Route path="/viewOrder/:orderId" element={<ManagerOrderDetailsPage />} />
                            <Route path="/addIngredient" element={<IngredientsManager />} />
                        </Route>

                        {/* Delivery-Only Routes (Role 1) */}
                        <Route element={<ProtectedRoute allowedRoles={[RoleEnum.Delivery]} />}>
                            <Route path="/delivery" element={<DeliveryHomePage />} />
                            <Route path="/delivery/:orderId" element={<DeliveryDetailsPage />} />
                        </Route>
                    </Route>
                </Route>

                {/* Fallback to Root */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}