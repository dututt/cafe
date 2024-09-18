import { useState } from 'react';

interface Data {
    trackingOrderTable: ITrackingOrderTable
}

const StatusCustomHook = (): void => {
    const init = ["Received", "Created", "Done"]
    const [data, setData] = useState<ITrackingOrderTable>();

};

export default StatusCustomHook;
