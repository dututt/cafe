import useSWR from "swr";

export const GetOrders = (): IOrderTable[] => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/order-list", fetcher, {
    refreshInterval: 60000,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return data;
};
