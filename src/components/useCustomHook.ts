import { useState, useEffect } from 'react';

interface Data {
    orderTables: IOrderTables
}

const useCustomHook = (): Data | null => {
    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        // Fetch or compute data
        setData({ orderTables: { items: [] } });
    }, []);

    return data;
};

export default useCustomHook;
