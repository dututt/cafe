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
}

interface ISelections {
    selections: ISelection[]
}