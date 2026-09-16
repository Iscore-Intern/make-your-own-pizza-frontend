export interface JwtPayload {
    sub?: string;
    nameid?: string;
    email?: string;
    role?: string | number;
    roles?: string[] | string | number;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | number;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
    [key: string]: unknown;
}

export const RoleEnum = {
    Manager: 0,
    Delivery: 1,
    Customer: 2,
} as const;

export type UserRole = (typeof RoleEnum)[keyof typeof RoleEnum];

export function parseJwt(token: string): JwtPayload | null {
    try {
        const parts = token.split(".");
        if (parts.length < 2) return null;
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload) as JwtPayload;
    } catch (e) {
        console.error("Failed to parse JWT:", e);
        return null;
    }
}

export function extractRoleFromToken(token: string, fallbackRole?: unknown): number {
    if (fallbackRole !== undefined && fallbackRole !== null && fallbackRole !== "") {
        const num = Number(fallbackRole);
        if (!isNaN(num)) return num;
        const str = String(fallbackRole).toLowerCase();
        if (str === "customer") return RoleEnum.Customer;
        if (str === "manager" || str === "admin") return RoleEnum.Manager;
        if (str === "delivery" || str === "driver") return RoleEnum.Delivery;
    }

    const payload = parseJwt(token);
    if (!payload) return RoleEnum.Customer;

    const rawRole =
        payload.role ??
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
        payload.roles;

    if (rawRole !== undefined && rawRole !== null) {
        const num = Number(rawRole);
        if (!isNaN(num)) return num;
        const str = String(rawRole).toLowerCase();
        if (str === "customer") return RoleEnum.Customer;
        if (str === "manager" || str === "admin") return RoleEnum.Manager;
        if (str === "delivery" || str === "driver") return RoleEnum.Delivery;
    }

    return RoleEnum.Customer;
}

export function extractUserIdFromToken(token: string, fallbackId?: string): string {
    if (fallbackId) return fallbackId;
    const payload = parseJwt(token);
    if (!payload) return "";
    return (
        payload.sub ||
        payload.nameid ||
        (payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] as string) ||
        ""
    );
}
