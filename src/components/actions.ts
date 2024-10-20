import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const GetMenus = () => {
  const { data, error, isLoading } = useSWR("/api/food-beverage", fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return data;
};

export const GetOrders = (): IOrderTable[] => {
  const { data, error, isLoading } = useSWR("/api/order-list", fetcher, {
    refreshInterval: 60000,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return data;
};

export const GetOrdersBy = (table_num: number): IOrderTable[] => {
  const { data, error, isLoading } = useSWR(
    `/api/order-items?table_num=${table_num}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return data;
};

export const UpdateOrderStatus = (id: number, status: string): void => {
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
        toast.warning("Update order status succeed !");
        mutate("/api/order-list");
      }
    });
};
