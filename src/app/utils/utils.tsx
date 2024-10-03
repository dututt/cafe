import { User } from "@clerk/nextjs/dist/types/server";
import { UserResource } from "@clerk/types"

export function isAdmin(user: UserResource | User) {
    return user.publicMetadata?.role === "admin"
}