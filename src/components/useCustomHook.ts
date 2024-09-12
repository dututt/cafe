import { useState, useEffect } from 'react';

interface Data {
    user: IUser
}

const useCustomHook = (): Data => {
    const init = { user: { id: 0, username: '', email: '', password: '', checkRole: false } }
    const [data, setData] = useState<Data>(init);

    return data;
};

export default useCustomHook;
