import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({});

export const config = {
  matcher: [
    "/admin",
    "/report",
    "/(orders-status)(.*)",
    "/(login)(.*)",
    "/(orders-management)(.*)",
    "/(food-beverage-management)(.*)",
  ],
};
