'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import useSWR from 'swr';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const Chart = () => {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        "/api/order-list",
        fetcher,
        {
            refreshInterval: 60000,
            revalidateIfStale: true,
            refreshWhenHidden: true,
            refreshWhenOffline: true,
            revalidateOnFocus: true,
            revalidateOnMount: true,
            revalidateOnReconnect: true
        }
    );


    if (data?.error || error) return <div>Failed to load</div>;
    if (isLoading) return <div>Orders loading...</div>
    const _orders: IOrderTable[] = data
    const dataOrders = _orders.map(item => {
        return item.price.toString()
    })
    const labelOrders = _orders.map(item => {
        return item.created_at.toString()
    })

    let dataReport = {
        labels: labelOrders,
        datasets: [
            {
                label: 'Tổng tiền theo ngày',
                data: dataOrders,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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


    return <Bar data={dataReport} options={options} />
}

export default Chart;
