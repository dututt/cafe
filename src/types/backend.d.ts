interface ICatalog {
    id: number
    content: string
    title: string
    type: number
    image: string
    created_at: Date
}

interface ICatalogPrice {
    id: number
    content: string
    title: string
    type: number
    image: string
    price: number
    price_order: number
}

interface ISelection {
    item: ICatalogPrice
    selected: boolean
    amount: number
}

interface ISelections {
    selections: ISelection[]
}

interface IOrderTable {
    id: number
    table_num: number
    status: string
    price: number
    count_items: number
    created_at: Date
}

interface IOrderItem {
    id: number
    title: string
    image: string
    item_num: number
}

// status: { "Accepted": false, "Received": false, "Created": false, "Done": false }
interface ITrackingOrderTable {
    table_id: number
    status: ITrackingState
}

interface ITrackingState {
    key: string
    value: boolean
}


interface IOrderTables {
    items: IOrderTable[]
}

interface IUser {
    id: number
    username: string
    email: string
    password: string
    checkRole: boolean
}