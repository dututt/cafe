"use server";

import { currentUser } from "@clerk/nextjs/server";
import { isAdmin, isManager, isOrder } from "../utils/utils";
import { toast } from "react-toastify";

export async function getUserAccount() {
  const user = await currentUser();
  return user?.primaryEmailAddress?.emailAddress.split("@")[0] ?? "";
}

export async function getCurrentUserRole() {
  const user = await currentUser();
  return user?.publicMetadata?.role;
}

export async function viewManager() {
  const user = await currentUser();
  if (!user || !isManager(user)) {
    return false;
  }
  return true;
}

export async function viewOrder() {
  const user = await currentUser();
  if (!user || !isOrder(user)) {
    return false;
  }
  return true;
}

export async function viewAdmin() {
  const user = await currentUser();
  if (!user || !isAdmin(user)) {
    return false;
  }
  return true;
}

export async function updateStatusTable(id: number, status: string) {
  fetch(`/api/update-order-status`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, status }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        toast.warning("Update order status table succeed !");
      }
    });
}

export async function updateNumberTable(id: number, numTable: number) {
  fetch(`/api/update-order-num-table`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, numTable }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        toast.warning("Update order number table succeed !");
      }
    });
}
