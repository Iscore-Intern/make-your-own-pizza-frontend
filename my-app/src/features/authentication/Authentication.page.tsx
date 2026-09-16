import { Navigate } from "react-router-dom";
import Authentication from "./authentication";
import { useAuthPage } from "./useAuthPage";
import { RoleEnum } from "@/Core/Utils/auth.utils";

export default function AuthenticationPage() {
    const authLogic = useAuthPage();

    const token = localStorage.getItem("token");
    const roleStr = localStorage.getItem("role");
    const roleNum = roleStr !== null ? Number(roleStr) : NaN;

    if (token) {
        if (roleNum === RoleEnum.Manager) return <Navigate to="/dashboard" replace />;
        if (roleNum === RoleEnum.Delivery) return <Navigate to="/delivery" replace />;
        return <Navigate to="/home" replace />;
    }

    return <Authentication {...authLogic} />;
}