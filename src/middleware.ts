import { authMiddleware } from "@clerk/nextjs/server"

export default authMiddleware({})

export const config = {
    matcher: ["/(orders-status)(.*)", "/(login)(.*)", "/(orders-management)(.*)"]
}