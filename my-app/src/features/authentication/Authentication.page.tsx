import { Navigate } from "react-router-dom";
import Authentication from "./authentication";
import { useAuthPage } from "./useAuthPage";
import { getAuthRole, getRoleDefaultPath } from "@/Core/Utils/auth.utils";

export default function AuthenticationPage() {
    const authLogic = useAuthPage();

    const token = localStorage.getItem("token");

    if (token) {
        const role = getAuthRole();
        return <Navigate to={getRoleDefaultPath(role)} replace />;
    }

    return <Authentication {...authLogic} />;
}