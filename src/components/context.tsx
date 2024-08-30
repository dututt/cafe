import React, { createContext, ReactNode, useState } from "react";

interface ContextProps {
    orderTables: IOrderTables
}

const Context = createContext<[ContextProps,
    React.Dispatch<React.SetStateAction<ContextProps>>
] | undefined>(undefined);

export const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<ContextProps>({ orderTables: { items: [] } })

    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    )
}

export default Context;