import { useState, useEffect } from 'react';

interface Data {
    status: string[]
}

const StatusCustomHook = (): Data => {
    const init = ["Received", "Created", "Done"]
    const [data, setData] = useState<Data>({ status: [] });

    return data;
};

export default StatusCustomHook;
