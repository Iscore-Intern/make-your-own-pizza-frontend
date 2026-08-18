import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthenticationPage from './features/authentication/Authentication.page';
import ProtectedRoute from './Core/ProtectedRoute';


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthenticationPage />} />
                {/* 🟢 PROTECTED SECTION: Requires a token to enter */}
                <Route element={<ProtectedRoute />}>
                    {/* <Route path="/orders" element={<MyOrdersPage />} /> */}
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}