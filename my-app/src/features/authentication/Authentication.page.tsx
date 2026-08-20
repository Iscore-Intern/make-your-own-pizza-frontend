import Authentication from "./authentication";
import { useAuthPage } from "./useAuthPage";

export default function AuthenticationPage() {
    const authLogic = useAuthPage();
    return <Authentication {...authLogic} />;
}