import { fetchDataAndRevalidate } from '@/app/utils/fetchDataAndRevalidate';
import React from 'react';

const RevalidateButton: React.FC = () => {
    const handleRevalidate = async () => {
        await fetchDataAndRevalidate('https://api-cafe-three.vercel.app/api/orders');
    };

    return <button onClick={handleRevalidate}>Revalidate Data</button>;
};

export default RevalidateButton;
