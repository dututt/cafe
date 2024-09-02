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
    id: number
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
}

interface ITrackingOrderTable {
    item: IOrderTable
    status: { 1: "Received", 2: "Created", 3: "Done" }
}

interface IOrderTables {
    items: IOrderTable[]
}