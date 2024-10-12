"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useSWR from "swr";
import CurrencyDisplay from "@/app/utils/currency.display";
import { Button, ButtonGroup } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IProps {
  reportBy: string;
}

const Chart = ({ reportBy }: IProps) => {
  const typeObject: Map<string, string> = new Map([
    ["day", "ngày"],
    ["month", "tháng"],
    ["year", "năm"],
  ]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/order-list", fetcher, {
    refreshInterval: 60000,
    revalidateIfStale: true,
    refreshWhenHidden: true,
    refreshWhenOffline: true,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });

  if (data?.error || error) return <div>Failed to load</div>;
  if (isLoading) return <div>Orders loading...</div>;
  const _orders: IOrderTable[] = data;

  const dataOrders: string[] = [];

  type GroupedData = {
    [key: string]: IOrderTable[];
  };

  const groupByDate = (items: IOrderTable[]): GroupedData => {
    return items
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .reduce((acc, item) => {
        let date = "";

        const _date = new Date(item.created_at); // Current date and time
        const year = _date.getFullYear(); // Get the year (e.g., 2024)
        const month = _date.getMonth() + 1; // Get the month (0-11, so add 1 for 1-12)
        const day = _date.getDate(); // Get the day of the month (1-31)

        if (reportBy === "day") {
          date =
            day.toString() + "/" + month.toString() + "/" + year.toString();
        } else if (reportBy === "month") {
          date = month.toString() + "/" + year.toString();
        } else if (reportBy === "year") {
          date = year.toString();
        }
        if (!acc[date.toString()]) {
          acc[date.toString()] = [];
        }
        acc[date.toString()].push(item);
        return acc;
      }, {} as GroupedData);
  };

  const groupedData = groupByDate(_orders);

  const labelOrders = Object.keys(groupedData).map((key) => {
    let prices: number = 0;
    groupedData[key].map((itemPrice) => {
      prices = prices + Number.parseInt(itemPrice.price.toString());
    });
    dataOrders.push(prices.toString());
    return key.toString();
  });

  let dataReport = {
    labels: labelOrders,
    datasets: [
      {
        label: `Tổng tiền theo ${typeObject.get(reportBy)}`,
        data: dataOrders,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <h1 className="d-flex justify-content-between align-items-start p-5">
        Báo cáo doanh thu theo {typeObject.get(reportBy)}
      </h1>
      <Bar data={dataReport} options={options} />

      <div className="d-flex justify-content-between flex-grow-1 pe-3 p-3">
        <Button variant="outline-primary">
          Tổng thu{" "}
          {
            <CurrencyDisplay
              amount={dataOrders.reduce(
                (acc, item) => acc + Number.parseInt(item),
                0
              )}
            />
          }
        </Button>
        <Button variant="outline-info">
          Doanh thu{" "}
          <CurrencyDisplay
            amount={dataOrders.reduce(
              (acc, item) => acc + Number.parseInt(item),
              0
            )}
          />
        </Button>
        <Button variant="outline-danger">
          Tổng chi <CurrencyDisplay amount={0} />
        </Button>
      </div>
    </>
  );
};

export default Chart;
