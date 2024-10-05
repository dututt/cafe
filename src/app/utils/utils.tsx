import { User } from "@clerk/nextjs/server";
import { UserResource } from "@clerk/types"

export function getURL() {
    // const pathname = usePathname()
    // const searchParams = useSearchParams();
    // const hash = typeof window !== 'undefined' ? window.location.hash : '';
    // const fullUrl = `${window.location.origin}${pathname}${searchParams && searchParams.toString() ? '?' + searchParams.toString() : ''}${hash}`;
    // let tableNum = fullUrl.split("#")[1]
}

export function isAdmin(user: UserResource | User) {
    return user.publicMetadata?.role === "admin"
}

export function isOrder(user: UserResource | User) {
    return user.publicMetadata?.role === "order"
}

export function isManager(user: UserResource | User) {
    return user.publicMetadata?.role === "manager"
}