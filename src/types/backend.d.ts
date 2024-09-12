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
}

interface ISelection {
    item: ICatalogPrice
    selected: boolean
    amount: number = 1
}

interface ISelections {
    selections: ISelection[]
}

interface IOrderTable {
    id: number = 0
    table_num: number
    status: boolean
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

interface ITrackingOrderTable {
    item: IOrderTable
    // status: { "Accepted": false, "Received": false, "Created": false, "Done": false }
    status: IKeyValue[]
}

interface IKeyValue {
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