interface ICatalog {
    id: number
    content: string
    author: string
    title: string
    type: number
    image: string
}

interface IProps {
    catalogs: ICatalog[]
}

interface ISelection {
    item: ICatalog
    selected: boolean
    amount: number = 1
}

interface ISelections {
    selections: ISelection[]
}

interface IOrderTable {
    orderTableNumber: number
    items: ISelections
}

interface IOrderTableList {
    items: IOrderTable[]
}