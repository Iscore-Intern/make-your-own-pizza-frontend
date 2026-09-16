import { useAppNavbar } from "./useAppNavbar";
import { RoleEnum } from "@/Core/Utils/auth.utils";

export default function AppNavbar() {
    const { role, cartCount, pathname, navigate, handleLogout } = useAppNavbar();

    const isCustomer = role === RoleEnum.Customer;
    const isManager = role === RoleEnum.Manager;
    const isDelivery = role === RoleEnum.Delivery;

    // Brand logo click destination
    const brandDestination = isManager ? "/dashboard" : isDelivery ? "/delivery" : "/home";

    // Helper for active button styling
    const getNavButtonClass = (isActive: boolean) =>
        `px-3.5 py-2 rounded-xl border-2 border-black-font text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 select-none ${
            isActive
                ? "bg-beige-dark text-black-font border-r-4 border-b-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white-color hover:bg-beige-color text-black-font hover:translate-x-0.5 hover:translate-y-0.5"
        }`;

    return (
        <header className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            {/* Brand Logo & Title */}
            <div
                onClick={() => navigate(brandDestination)}
                className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
                <span className="text-3xl transition-transform group-hover:rotate-12 group-hover:scale-110" role="img" aria-label="pizza">
                    🍕
                </span>
                <div>
                    <span className="font-black text-black-font text-lg tracking-wider block leading-tight">
                        MAKE YOUR PIZZA
                    </span>
                    <span className="text-[11px] font-bold text-red-color tracking-widest block uppercase">
                        {isManager
                            ? "Kitchen & Ops Dashboard"
                            : isDelivery
                            ? "Delivery Fleet & Dispatch"
                            : "Craft & Customize"}
                    </span>
                </div>
            </div>

            {/* Navigation Actions */}
            <nav className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center">
                {/* 1. Customer Navigation */}
                {isCustomer && (
                    <>
                        <button
                            type="button"
                            onClick={() => navigate("/home")}
                            className={getNavButtonClass(pathname === "/home" || pathname === "/builder")}
                        >
                            Pizza Builder
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/cart")}
                            className={`px-3.5 py-2 rounded-xl border-2 border-black-font text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 ${
                                pathname === "/cart" || pathname === "/checkout"
                                    ? "bg-beige-dark text-black-font border-r-4 border-b-4"
                                    : "bg-beige-color hover:bg-beige-dark text-black-font"
                            }`}
                        >
                            <span>🛒 Cart</span>
                            {cartCount > 0 && (
                                <span className="px-1.5 py-0.5 rounded-full bg-red-color text-white-color text-[10px] font-black leading-none">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/orders")}
                            className={getNavButtonClass(pathname === "/orders" || pathname.startsWith("/singleOrder"))}
                        >
                            My Orders
                        </button>
                    </>
                )}

                {/* 2. Manager Navigation */}
                {isManager && (
                    <>
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className={getNavButtonClass(pathname === "/dashboard" || pathname.startsWith("/viewOrder"))}
                        >
                            Orders Dashboard
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/addIngredient")}
                            className={getNavButtonClass(pathname === "/addIngredient")}
                        >
                            Manage Ingredients
                        </button>
                    </>
                )}

                {/* 3. Delivery Navigation */}
                {isDelivery && (
                    <>
                        <button
                            type="button"
                            onClick={() => navigate("/delivery")}
                            className={getNavButtonClass(pathname === "/delivery" || pathname.startsWith("/delivery/"))}
                        >
                            Assigned Deliveries
                        </button>
                    </>
                )}

                {/* 4. Common Authenticated Links: Profile */}
                <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className={getNavButtonClass(pathname === "/profile")}
                >
                    Profile
                </button>

                {/* 5. Logout Button */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-xl border-2 border-black-font text-xs font-bold bg-red-color text-white-color hover:opacity-90 border-r-4 border-b-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-1 select-none active:translate-x-0.5 active:translate-y-0.5"
                    title="Log Out"
                >
                    <span>Sign Out</span>
                    <span>→</span>
                </button>
            </nav>
        </header>
    );
}
