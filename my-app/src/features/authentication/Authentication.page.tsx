import Authentication from "./authentication";
import { useAuthPage } from "./useAuthPage";

export default function AuthenticationPage() {
    // 1. Grab the logic from the hook
    const authLogic = useAuthPage();

    // 2. Spread the logic into the UI component as props
    return <Authentication {...authLogic} />;
}