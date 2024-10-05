'use server'
import { currentUser } from '@clerk/nextjs/server';
import { isAdmin, isManager, isOrder } from "../utils/utils";

export async function viewOrder() {
    const user = await currentUser()
    if (!user || !isOrder(user)) {
        return false
    }
    return true
}

export async function createNewMenu() {
    const user = await currentUser()
    if (!user || !isAdmin(user)) {
        return false
    }
    return true
}