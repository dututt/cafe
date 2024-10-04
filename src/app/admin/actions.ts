'use server'
import { currentUser } from '@clerk/nextjs/server';
import { isAdmin } from "../utils/utils";

export async function createNewMenu() {
    const user = await currentUser()
    if (!user || !isAdmin(user)) {
        // throw new Error("Not authorized")
        return false
    }
    return true
}