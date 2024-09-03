import { useState, useEffect } from 'react';

interface Data {
    user: IUser
}

const useCustomHook = (): Data => {
    const init = { user: { email: '', password: '', checkRole: false } }
    const [data, setData] = useState<Data>(init);

    // useEffect(() => {
    //     setData(init)
    // })
    return data;
};

export default useCustomHook;
